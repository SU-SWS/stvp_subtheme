import SearchBox from "./search-box";
import {
  useClearRefinements,
  useCurrentRefinements,
  usePagination,
  useRefinementList
} from "react-instantsearch";
import {Filters, FilterTray} from "../styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import {useEffect, useRef, useState} from "preact/compat";
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

const TrayRefinement = ({attribute, labelOverride}: { attribute: string, labelOverride?: string }) => {
  const {items, refine} = useRefinementList({attribute, limit: 99})
  const [open, setOpen] = useState(false)
  const label = labelOverride ?? attribute.replace("media_", "")
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <div className={`tray-section${open ? ' tray-section--open' : ''}`}>
      <button
        className="tray-section-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="tray-section-title">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" className="tray-section-chevron">
          <path d="M5.98129 7.32316C6.35238 7.69426 6.95504 7.69426 7.32613 7.32316L13.0261 1.62316C13.3972 1.25207 13.3972 0.649414 13.0261 0.27832C12.655 -0.0927734 12.0524 -0.0927734 11.6813 0.27832L6.65223 5.30738L1.62316 0.281289C1.25207 -0.089805 0.649414 -0.089805 0.27832 0.281289C-0.0927734 0.652383 -0.0927734 1.25504 0.27832 1.62613L5.97832 7.32613L5.98129 7.32316Z" fill="#43423E"/>
        </svg>
      </button>
      {open && (
        <ul className="tray-option-list">
          {items.map(item => (
            <li key={item.value} className="tray-option-item">
              <button
                role="checkbox"
                aria-checked={item.isRefined}
                className={`tray-option-btn${item.isRefined ? ' tray-option-btn--checked' : ''}`}
                onClick={() => refine(item.value)}
              >
                <span className="tray-checkbox" aria-hidden="true">
                  {item.isRefined && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 3.5L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="tray-option-text">{item.label}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="tray-option-empty">No options available</li>
          )}
        </ul>
      )}
    </div>
  )
}

const TRAY_SECTIONS = [
  {attribute: 'media_series', label: 'Series'},
  {attribute: 'media_topics', label: 'Topics'},
  {attribute: 'media_type',   label: 'Media'},
]

const MediaFilters = () => {
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {lock: lockScroll, unlock: unlockScroll} = useScrollLock({autoLock: false})
  const {refine: clearAll} = useClearRefinements()
  const {items: currentRefinements} = useCurrentRefinements()

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
    return () => unlockScroll()
  }, [trayOpen])

  const {width = 0} = useWindowSize()
  const {nbHits} = usePagination({padding: 2})

  const PRIMARY_ATTRIBUTES = ['media_series', 'media_type']
  const firstAttributes = width > 768 ? PRIMARY_ATTRIBUTES : []

  const allActiveTags = currentRefinements.flatMap(refinement =>
    refinement.refinements.map(item => ({
      label: item.label,
      refine: () => refinement.refine(item),
    }))
  )
  const hasActive = allActiveTags.length > 0

  return (
    <Filters className="media-filters-wrapper">
      <div className="filter-top-row">
        <p className="results-counter" aria-live="polite" aria-atomic>{nbHits} results</p>
        <div className="filters">
          <SearchBox/>
          {firstAttributes.length > 0 &&
            <div className="primary-filters">
              {firstAttributes.map(attribute =>
                <Refinement key={attribute} attribute={attribute}/>
              )}
            </div>
          }
          <div className="additional-filters">
            <button ref={buttonRef} onClick={toggleTray} className="all-filters-btn">
              {width <= 991 ? (
                <>Filters <span aria-hidden="true">›</span></>
              ) : (
                <>All Filters <i class="fa-solid fa-sliders"></i></>
              )}
            </button>
          </div>
        </div>
      </div>

      {width >= 1500 && hasActive && (
        <div className="active-filters-bar">
          {allActiveTags.map((tag, i) => (
            <button key={i} className="active-filter-tag" onClick={tag.refine} type="button">
              {tag.label}
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          ))}
          <button className="active-filters-clear" onClick={() => clearAll()} type="button">Clear All</button>
        </div>
      )}

      <FilterTray $open={trayOpen} ref={ref}>
        <div className="tray-header">
          <span className="tray-title">Filters</span>
          <button className="tray-close" onClick={closeTray}>
            <i class="fa-solid fa-close"></i>
            <span className="visually-hidden">Close Filters</span>
          </button>
        </div>

        <div className="tray-body">
          {TRAY_SECTIONS.map(({attribute, label}) =>
            <TrayRefinement key={attribute} attribute={attribute} labelOverride={label}/>
          )}
        </div>

        <div className="tray-footer">
          <button className="tray-clear" onClick={() => { clearAll(); }}>
            Clear All
          </button>
          <button className="tray-view-results" onClick={closeTray}>
            View Results
          </button>
        </div>
      </FilterTray>
    </Filters>
  )
}
export default MediaFilters
