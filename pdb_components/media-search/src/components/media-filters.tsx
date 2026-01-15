import SearchBox from "./search-box";
import {
  useDynamicWidgets,
  usePagination,
  useRefinementList
} from "react-instantsearch";
import {Filters, FilterTray} from "../styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import {useEffect, useRef} from "preact/compat";
import {useBoolean, useScrollLock, useWindowSize} from "usehooks-ts";
import ComboBox, {ComboBoxOption} from "./combo-box";

const Refinement = ({attribute}: { attribute: string }) => {
  const {items, refine} = useRefinementList({attribute, limit: 99})

  const label = attribute.replace("media_", "")
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <ComboBox
      items={items}
      label={label}
      multiple
      value={items.filter(item => item.isRefined)}
      // @ts-ignore
      onChange={(values: ComboBoxOption[]) => {
        const selectedValues = values.map(value => value.value)
        const refinedItems = items.filter(item => item.isRefined).map(item => item.value)

        refinedItems.map(refinedItem => {
          if (!selectedValues.includes(refinedItem)) {
            refine(refinedItem)
          }
        })

        selectedValues.map(selectedValue => {
          if (!refinedItems.includes(selectedValue)) {
            refine(selectedValue)
          }
        })
      }}
    />
  )
}

const MediaFilters = () => {
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {lock: lockScroll, unlock: unlockScroll} = useScrollLock()

  const {
    value: trayOpen,
    setFalse: closeTray,
    toggle: toggleTray
  } = useBoolean(false)

  useOutsideClick(ref, () => {
    if (trayOpen) {
      closeTray();
      buttonRef.current?.focus()
    }
  })

  useEffect(() => {
    if (trayOpen) lockScroll()
    if (!trayOpen) unlockScroll()
  }, [trayOpen])

  const {attributesToRender} = useDynamicWidgets()
  const {width = 0} = useWindowSize()

  const {nbHits} = usePagination({padding: 2})

  const firstAttributes = width > 768 ? attributesToRender.slice(0, 1) : []
  const remainingAttributes = width > 768 ? attributesToRender.slice(1) : [...attributesToRender]

  return (
    <Filters>
      <p aria-live="polite" aria-atomic>{nbHits} Results</p>
      <div className="filters">
        <SearchBox/>
        {firstAttributes.length > 0 &&
          <div>
            {firstAttributes.map(attribute =>
              <Refinement key={attribute} attribute={attribute}/>
            )}
          </div>
        }
        {remainingAttributes.length > 0 &&
          <div ref={ref} className="additional-filters">
            <button ref={buttonRef} onClick={toggleTray}>
              All Filters
              <i class="fa-solid fa-sliders"></i>
            </button>

            <FilterTray $open={trayOpen}>
              <button onClick={closeTray}>
                <i class="fa-solid fa-close"></i>
                <span className="visually-hidden">Close Filters</span>
              </button>
              {remainingAttributes.map(attribute =>
                <Refinement key={attribute} attribute={attribute}/>
              )}
            </FilterTray>
          </div>
        }
      </div>
    </Filters>
  )
}
export default MediaFilters
