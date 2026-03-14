import {Menu} from '@base-ui/react/menu';
import {ReactElement, useEffect, useId, useMemo, useRef, useState} from "preact/compat";
import {DropDownListPortalStyle, DropDownListStyle} from "../styled-components";

export type DropDownListOption = {
  label: string;
  value: string;
}

const DropDownList = ({items, label, value, onChange, multiple, placeholder}: {
  items: Array<DropDownListOption>,
  label: string | ReactElement
  value?: DropDownListOption | Array<DropDownListOption>
  onChange?: (value: DropDownListOption | Array<DropDownListOption> | null) => void
  multiple?: boolean
  placeholder?: string
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();
  const typeaheadRef = useRef('');
  const typeaheadTimerRef = useRef<number | null>(null);

  const selectedValues = useMemo(() => {
    if (!value) return new Set<string>();
    if (Array.isArray(value)) return new Set(value.map((item) => item.value));
    return new Set([value.value]);
  }, [value]);

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedValues.has(item.value));
  }, [items, selectedValues]);

  const handleToggle = (item: DropDownListOption, checked: boolean) => {
    if (!onChange) return;

    if (multiple) {
      const next = new Set(selectedValues);
      if (checked) next.add(item.value);
      else next.delete(item.value);
      onChange(items.filter((option) => next.has(option.value)));
      return;
    }

    onChange(checked ? item : null);
    setOpen(false);
  };

  const isSpaceKey = (key: string) => key === ' ' || key === 'Space' || key === 'Spacebar';
  const isPrintableCharacter = (event: KeyboardEvent) =>
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const getInitialActiveIndex = () => {
    if (!items.length) return -1;
    const firstSelected = items.findIndex((item) => selectedValues.has(item.value));
    return firstSelected >= 0 ? firstSelected : 0;
  };

  const clearTypeahead = () => {
    typeaheadRef.current = '';
    if (typeaheadTimerRef.current !== null) {
      window.clearTimeout(typeaheadTimerRef.current);
      typeaheadTimerRef.current = null;
    }
  };

  const updateTypeahead = (char: string) => {
    typeaheadRef.current += char.toLowerCase();
    if (typeaheadTimerRef.current !== null) {
      window.clearTimeout(typeaheadTimerRef.current);
    }
    typeaheadTimerRef.current = window.setTimeout(() => {
      typeaheadRef.current = '';
      typeaheadTimerRef.current = null;
    }, 700);
    return typeaheadRef.current;
  };

  const findMatchingIndex = (search: string, startIndex = 0) => {
    if (!items.length) return -1;
    const query = search.toLowerCase();
    for (let i = 0; i < items.length; i += 1) {
      const idx = (startIndex + i) % items.length;
      if (items[idx].label.toLowerCase().startsWith(query)) {
        return idx;
      }
    }
    return -1;
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (isPrintableCharacter(event)) {
      event.preventDefault();
      const search = updateTypeahead(event.key);
      const start = activeIndex >= 0 ? activeIndex + 1 : 0;
      const match = findMatchingIndex(search, start);
      const nextIndex = match >= 0 ? match : findMatchingIndex(search, 0);

      if (!open) {
        setOpen(true);
      }
      setActiveIndex(nextIndex >= 0 ? nextIndex : getInitialActiveIndex());
      return;
    }

    if (isSpaceKey(event.key) || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      setOpen((prev) => {
        const nextOpen = !prev;
        if (nextOpen) {
          setActiveIndex(getInitialActiveIndex());
        }
        return nextOpen;
      });
    }
  };

  const handleItemKeyDown = (event: KeyboardEvent, item?: DropDownListOption) => {
    if (
      isSpaceKey(event.key) ||
      event.key === 'Tab' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Home' ||
      event.key === 'End'
    ) {
      // Prevent Base UI Menu from handling these keys as "leave/close menu".
      event.stopPropagation();
    }

    const current = event.currentTarget as HTMLElement;
    const list = current.closest('.dropdown-list');
    if (!list) return;

    const focusableItems = Array.from(list.querySelectorAll<HTMLElement>('.dropdown-item'));
    const currentIndex = focusableItems.indexOf(current);
    if (currentIndex === -1) return;

    if (isSpaceKey(event.key)) {
      event.preventDefault();
      if (item) {
        const nextChecked = !selectedValues.has(item.value);
        handleToggle(item, nextChecked);
      }
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = currentIndex + delta;
      if (nextIndex >= 0 && nextIndex < focusableItems.length) {
        focusableItems[nextIndex].focus();
      }
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusableItems[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusableItems[focusableItems.length - 1]?.focus();
      return;
    }

    if (event.key === 'Tab') {
      const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex >= 0 && nextIndex < focusableItems.length) {
        event.preventDefault();
        focusableItems[nextIndex].focus();
        return;
      }

      // If user tabs past list bounds, close the dropdown and allow
      // browser default tab navigation to continue naturally.
      setOpen(false);

      if (event.shiftKey) {
        // For reverse tab from first item, move focus back to trigger first.
        event.preventDefault();
        const trigger = document.querySelector<HTMLElement>('.dropdown-input[aria-expanded="true"]');
        trigger?.focus();
      }
    }
  };

  const preventHoverFocus = (event: MouseEvent | PointerEvent) => {
    // Prevent Base UI menu from moving keyboard focus on hover.
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (open && activeIndex < 0) {
      setActiveIndex(getInitialActiveIndex());
    }
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const activeEl = document.getElementById(optionId(activeIndex));
    activeEl?.scrollIntoView({block: 'nearest'});
  }, [open, activeIndex, listboxId]);

  useEffect(() => {
    return () => clearTypeahead();
  }, []);

  return (
    <Menu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropDownListStyle>
        <label className={multiple ? "visually-hidden" : ""}>{label}</label>
        <Menu.Trigger
          className="dropdown-input"
          type="button"
          role="combobox"
          aria-multiselectable="true"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className="dropdown-input-label">
            {multiple
              ? `${label}${selectedItems.length ? ` (${selectedItems.length})` : ''}`
              : (selectedItems[0]?.label || placeholder || label)}
          </span>
          <ChevronIcon className={`dropdown-chevron ${open ? "is-open" : ""}`} aria-hidden="true" />
        </Menu.Trigger>
      </DropDownListStyle>

      {open && (
        <Menu.Portal className="dropdown-portal">
          <DropDownListPortalStyle>
            <Menu.Positioner side="bottom" align="start" sideOffset={25} alignOffset={0} className="dropdown-positioner">
              <Menu.Popup className="dropdown-popup">
                <ul
                  id={listboxId}
                  className="dropdown-list"
                  role="listbox"
                  aria-multiselectable="true"
                >
                  {items.length === 0 && (
                    <li className="dropdown-empty">No options found.</li>
                  )}
                  {items.map((item: DropDownListOption, index: number) => (
                    <li key={item.value}>
                      <Menu.CheckboxItem
                        id={optionId(index)}
                        role="option"
                        aria-selected={selectedValues.has(item.value) ? "true" : "false"}
                        checked={selectedValues.has(item.value)}
                        onCheckedChange={(checked: boolean) => handleToggle(item, checked)}
                        className="dropdown-item"
                        tabIndex={0}
                        aria-label={item.label}
                        onPointerMoveCapture={preventHoverFocus}
                        onMouseMoveCapture={preventHoverFocus}
                        onKeyDownCapture={(event: KeyboardEvent) => handleItemKeyDown(event, item)}
                        onKeyDown={(event: KeyboardEvent) => handleItemKeyDown(event, item)}
                      >
                        <div className="dropdown-item-indicator">
                          <span className="dropdown-checkbox" aria-hidden="true">
                            {selectedValues.has(item.value) && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                                <path d="M1 3.5L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="dropdown-label">{item.label}</div>
                      </Menu.CheckboxItem>
                    </li>
                  ))}
                </ul>
              </Menu.Popup>
            </Menu.Positioner>
          </DropDownListPortalStyle>
        </Menu.Portal>
      )}
    </Menu.Root>
  );
}

const ChevronIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg width="19" height="19" viewBox="0 0 19 20" fill="none" aria-hidden="true" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.82895 13.9709C9.20004 14.342 9.8027 14.342 10.1738 13.9709L15.8738 8.27087C16.2449 7.89978 16.2449 7.29712 15.8738 6.92603C15.5027 6.55493 14.9 6.55493 14.5289 6.92603L9.49988 11.9551L4.47082 6.92899C4.09973 6.5579 3.49707 6.5579 3.12598 6.92899C2.75488 7.30009 2.75488 7.90274 3.12598 8.27384L8.82598 13.9738L8.82895 13.9709Z" fill="#43423E"/>
    </svg>

  );
}


const CheckIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true" {...props}>
      <path d="M1 3.5L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  );
}

export default DropDownList
