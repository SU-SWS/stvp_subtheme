import {Menu} from '@base-ui/react/menu';
import {ReactElement, useMemo, useState} from "preact/compat";
import {ComboBoxPortalStyle, ComboBoxStyle} from "../styled-components";

export type ComboBoxOption = {
  label: string;
  value: string;
}

const ComboBox = ({items, label, value, onChange, multiple, placeholder}: {
  items: Array<ComboBoxOption>,
  label: string | ReactElement
  value?: ComboBoxOption | Array<ComboBoxOption>
  onChange?: (value: ComboBoxOption | Array<ComboBoxOption> | null) => void
  multiple?: boolean
  placeholder?: string
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root
      items={items}
      multiple={multiple}
      onValueChange={onChange}
      value={value}
      open={open}
      onOpenChange={setOpen}
      style={{display: 'inline-flex', alignItems: 'center'}}
    >
      <ComboBoxStyle data-open={open || undefined}>
        <label htmlFor={id} className={multiple ? "visually-hidden" : ""}>{label}</label>
        <div className="input-wrapper">
          <Combobox.Input
            placeholder={multiple ? label : placeholder} id={id}
            className="combo-input"
          />
          {/* <Combobox.Value/> */}
          <div className="input-clear">
            <Combobox.Clear
              aria-label="Clear selection"
              className="combo-clear"
            >
              <i class="fa-solid fa-close"></i>
            </Combobox.Clear>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" className="combo-chevron" style={{cursor:'pointer'}} onClick={() => setOpen(!open)}>
              <path d="M5.98129 7.32316C6.35238 7.69426 6.95504 7.69426 7.32613 7.32316L13.0261 1.62316C13.3972 1.25207 13.3972 0.649414 13.0261 0.27832C12.655 -0.0927734 12.0524 -0.0927734 11.6813 0.27832L6.65223 5.30738L1.62316 0.281289C1.25207 -0.089805 0.649414 -0.089805 0.27832 0.281289C-0.0927734 0.652383 -0.0927734 1.25504 0.27832 1.62613L5.97832 7.32613L5.98129 7.32316Z" fill="#43423E"/>
            </svg>
          </div>
        </div>
  const selectedValues = useMemo(() => {
    if (!value) return new Set<string>();
    if (Array.isArray(value)) return new Set(value.map((item) => item.value));
    return new Set([value.value]);
  }, [value]);

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedValues.has(item.value));
  }, [items, selectedValues]);

  const handleToggle = (item: ComboBoxOption, checked: boolean) => {
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

  return (
    <Menu.Root open={open} onOpenChange={setOpen} modal={false}>
      <ComboBoxStyle>
        <label className={multiple ? "visually-hidden" : ""}>{label}</label>
        <div className="input-wrapper">
          <Menu.Trigger className="combo-input">
            <span className="combo-input-label">
              {multiple
                ? `${label}${selectedItems.length ? ` (${selectedItems.length})` : ''}`
                : (selectedItems[0]?.label || placeholder || label)}
            </span>
            <ChevronIcon className={`combo-chevron ${open ? "is-open" : ""}`} />
          </Menu.Trigger>

          {selectedItems.length > 0 && (
            <div className="input-clear">
              <button
                aria-label="Clear selection"
                className="combo-clear"
                onClick={() => onChange?.(multiple ? [] : null)}
                type="button"
              >
                <i class="fa-solid fa-close"></i>
              </button>
            </div>
          )}
        </div>
      </ComboBoxStyle>

      <Menu.Portal className="combo-portal">
        <ComboBoxPortalStyle>
          <Menu.Positioner align="start" className="combo-positioner">
            <Menu.Popup className="combo-popup">
              <ul className="combo-list">
                {items.length === 0 && (
                  <li className="combo-empty">No options found.</li>
                )}
                {items.map((item: ComboBoxOption) => (
                  <li key={item.value}>
                    <Menu.CheckboxItem
                      checked={selectedValues.has(item.value)}
                      onCheckedChange={(checked: boolean) => handleToggle(item, checked)}
                      className="combo-item"
                    >
                      <div className="combo-item-indicator">
                        <input
                          type="checkbox"
                          tabIndex={-1}
                          aria-hidden="true"
                          readOnly
                          className="combo-checkbox"
                          checked={selectedValues.has(item.value)}
                        />
                      </div>
                      <div className="combo-label">{item.label}</div>
                    </Menu.CheckboxItem>
                  </li>
                ))}
              </ul>
            </Menu.Popup>
          </Menu.Positioner>
        </ComboBoxPortalStyle>
      </Menu.Portal>
    </Menu.Root>
  );
}

const ChevronIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg width="19" height="19" viewBox="0 0 19 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.82895 13.9709C9.20004 14.342 9.8027 14.342 10.1738 13.9709L15.8738 8.27087C16.2449 7.89978 16.2449 7.29712 15.8738 6.92603C15.5027 6.55493 14.9 6.55493 14.5289 6.92603L9.49988 11.9551L4.47082 6.92899C4.09973 6.5579 3.49707 6.5579 3.12598 6.92899C2.75488 7.30009 2.75488 7.90274 3.12598 8.27384L8.82598 13.9738L8.82895 13.9709Z" fill="#43423E"/>
    </svg>

  );
}

const CheckIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" {...props}>
      <path d="M1 3.5L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  );
}

export default ComboBox
