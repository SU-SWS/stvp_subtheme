import {Menu} from '@base-ui/react/menu';
import {ReactElement, useMemo, useState} from "preact/compat";
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

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      setOpen((prev) => !prev);
    }
  };

  const handleItemKeyDown = (event: KeyboardEvent) => {
    if (
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

  return (
    <Menu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropDownListStyle>
        <label className={multiple ? "visually-hidden" : ""}>{label}</label>
        <div className="input-wrapper">
          <Menu.Trigger className="dropdown-input" type="button" onKeyDown={handleTriggerKeyDown}>
            <span className="dropdown-input-label">
              {multiple
                ? `${label}${selectedItems.length ? ` (${selectedItems.length})` : ''}`
                : (selectedItems[0]?.label || placeholder || label)}
            </span>
            <ChevronIcon className={`dropdown-chevron ${open ? "is-open" : ""}`} aria-hidden="true" />
          </Menu.Trigger>
        </div>
      </DropDownListStyle>

      {open && (
        <Menu.Portal className="dropdown-portal">
          <DropDownListPortalStyle>
            <Menu.Positioner side="bottom" align="start" sideOffset={25} alignOffset={0} className="dropdown-positioner">
              <Menu.Popup className="dropdown-popup">
                <ul className="dropdown-list">
                  {items.length === 0 && (
                    <li className="dropdown-empty">No options found.</li>
                  )}
                  {items.map((item: DropDownListOption) => (
                    <li key={item.value}>
                      <Menu.CheckboxItem
                        checked={selectedValues.has(item.value)}
                        onCheckedChange={(checked: boolean) => handleToggle(item, checked)}
                        className="dropdown-item"
                        tabIndex={0}
                        aria-label={item.label}
                        onKeyDownCapture={handleItemKeyDown}
                        onKeyDown={handleItemKeyDown}
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
