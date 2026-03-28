import {Select} from '@base-ui/react/select';
import {ReactElement, useLayoutEffect, useRef} from "preact/compat";
import {
  RefinementListItem
} from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import {DropDownListStyle, DropDownPortalStyle} from "../styled-components";

const DropDownList = ({items, label, value, onChange, multiple}: {
  items: Array<RefinementListItem>,
  label: string | ReactElement
  value?: string | Array<string>
  onChange: (value: string | Array<string> | null) => void
  multiple?: boolean
  placeholder?: string
}) => {
  const ref = useRef<HTMLInputElement>(null)
  useLayoutEffect(() => {
    if (ref.current) ref.current.type = "hidden"
  }, [])

  return (
    <DropDownListStyle>
      <div className="select-dropdown select-dropdown-container">
        <Select.Root
          items={items}
          onValueChange={onChange}
          value={value}
          multiple={multiple}
          modal={false}
          inputRef={ref}
        >
          <Select.Trigger className="trigger">
            <Select.Label className="label hidden">
              {label}
            </Select.Label>
            {label}
            <Select.Icon className="icon-span">
              <ChevronIcon/>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal className="portal">
            <Select.Positioner
              align="start"
              sideOffset={50}
              style={{pointerEvents: 'none', zIndex: 1300}}
            >
              <DropDownPortalStyle style={{pointerEvents: 'auto'}}>
              <Select.Popup className="popup">
                  <Select.List className="list">
                    {items.map(item => (
                      <Select.Item
                        key={item.label}
                        value={item.value}
                        className="item"
                      >
                        <Select.ItemIndicator keepMounted>
                          {value?.includes(item.label) &&
                            <i class="fa-regular fa-square-check"></i>}
                          {!value?.includes(item.label) &&
                            <i class="fa-regular fa-square"></i>}
                        </Select.ItemIndicator>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </DropDownPortalStyle>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </div>
    </DropDownListStyle>
  );
}

const ChevronIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg width="19" height="19" viewBox="0 0 19 20" fill="none"
         aria-hidden="true" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.82895 13.9709C9.20004 14.342 9.8027 14.342 10.1738 13.9709L15.8738 8.27087C16.2449 7.89978 16.2449 7.29712 15.8738 6.92603C15.5027 6.55493 14.9 6.55493 14.5289 6.92603L9.49988 11.9551L4.47082 6.92899C4.09973 6.5579 3.49707 6.5579 3.12598 6.92899C2.75488 7.30009 2.75488 7.90274 3.12598 8.27384L8.82598 13.9738L8.82895 13.9709Z"
        fill="#43423E"/>
    </svg>

  );
}
export default DropDownList
