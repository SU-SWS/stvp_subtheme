import {Combobox, ComboboxItemIndicatorState} from '@base-ui/react/combobox';
import {ReactElement, useId, useState} from "preact/compat";
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
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root
      items={items}
      multiple={multiple}
      onValueChange={onChange}
      value={value}
      open={open}
      onOpenChange={setOpen}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" className="combo-chevron">
              <path d="M5.98129 7.32316C6.35238 7.69426 6.95504 7.69426 7.32613 7.32316L13.0261 1.62316C13.3972 1.25207 13.3972 0.649414 13.0261 0.27832C12.655 -0.0927734 12.0524 -0.0927734 11.6813 0.27832L6.65223 5.30738L1.62316 0.281289C1.25207 -0.089805 0.649414 -0.089805 0.27832 0.281289C-0.0927734 0.652383 -0.0927734 1.25504 0.27832 1.62613L5.97832 7.32613L5.98129 7.32316Z" fill="#43423E"/>
            </svg>
          </div>
        </div>

      </ComboBoxStyle>

      <Combobox.Portal className="combo-portal">
        <ComboBoxPortalStyle>
          <Combobox.Positioner
            align="start"
            className="combo-positioner"
          >
            <Combobox.Popup className="combo-popup">
              <Combobox.Empty className="combo-empty">
                No options found.
              </Combobox.Empty>
              <Combobox.List className="combo-list">
                {(item: ComboBoxOption) => (
                  <Combobox.Item
                    key={item.value}
                    value={item}
                    className="combo-item"
                  >                    
                    <div className="combo-item-indicator">
                      <input
                        type="checkbox"
                        tabIndex={-1}
                        aria-hidden="true"
                        readOnly
                        className="combo-checkbox"
                        checked={false}
                      />
                    </div>
                    <div className="combo-label">{item.label}</div>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </ComboBoxPortalStyle>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

const CheckIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg fill="currentcolor" width="10" height="10"
         viewBox="0 0 10 10" {...props}>
      <path
        d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z"/>
    </svg>
  );
}

export default ComboBox
