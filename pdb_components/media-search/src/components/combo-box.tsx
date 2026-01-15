import {Combobox} from '@base-ui/react/combobox';
import {ReactElement, useId} from "preact/compat";
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

  return (
    <Combobox.Root
      items={items}
      multiple={multiple}
      onValueChange={onChange}
      value={value}
    >
      <ComboBoxStyle>
        <label htmlFor={id}>{label}</label>
        <div>
          <Combobox.Input
            placeholder={placeholder} id={id}
            className="combo-input"
          />
          <Combobox.Value/>
          <div>
            <Combobox.Clear
              aria-label="Clear selection"
              className="combo-clear"
            >
              <i class="fa-solid fa-close"></i>
            </Combobox.Clear>
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
                    <Combobox.ItemIndicator className="combo-item-indicator">
                      <CheckIcon/>
                    </Combobox.ItemIndicator>
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
