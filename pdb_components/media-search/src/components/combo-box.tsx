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
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.82895 13.9709C9.20004 14.342 9.8027 14.342 10.1738 13.9709L15.8738 8.27087C16.2449 7.89978 16.2449 7.29712 15.8738 6.92603C15.5027 6.55493 14.9 6.55493 14.5289 6.92603L9.49988 11.9551L4.47082 6.92899C4.09973 6.5579 3.49707 6.5579 3.12598 6.92899C2.75488 7.30009 2.75488 7.90274 3.12598 8.27384L8.82598 13.9738L8.82895 13.9709Z" fill="#43423E"/>
    </svg>

  );
}

export default ComboBox
