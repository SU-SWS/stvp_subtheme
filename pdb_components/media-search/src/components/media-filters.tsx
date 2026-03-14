import SearchBox from "./search-box";
import {
  useDynamicWidgets,
  useClearRefinements,
  useCurrentRefinements,
  usePagination,
  useRefinementList
} from "react-instantsearch";
import {Filters, FilterTray} from "../styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import {useEffect, useLayoutEffect, useRef, useState} from "preact/compat";
import {useBoolean, useScrollLock, useWindowSize} from "usehooks-ts";
import DropDownList, {DropDownListOption} from "./dropdown-list";

const labels = new Map([["media_icon", 'Media Type'], ["media_series", "Series"], ["media_type", "Topics"]])

const Refinement = ({attribute}: { attribute: string }) => {
  const {items, refine} = useRefinementList({attribute, limit: 99})

  const label = labels.get(attribute) || attribute.replace("media_", "")
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <DropDownList
      items={items}
      label={label}
      multiple
      value={items.filter(item => item.isRefined)}
      // @ts-ignore
      onChange={(values: DropDownListOption[]) => {
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

const TrayRefinement = ({attribute, labelOverride}: {
  attribute: string,
  labelOverride?: string
}) => {
  const {items, refine} = useRefinementList({attribute, limit: 99})
  const [open, setOpen] = useState(false)
  const label = labelOverride ?? attribute.replace("media_", "")
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const toggleId = `tray-toggle-${attribute}`
  const listId = `tray-list-${attribute}`
  const selectedCount = items.filter(i => i.isRefined).length

  return (
    <div className={`tray-section${open ? ' tray-section--open' : ''}`}>
      <button
        id={toggleId}
        className="tray-section-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}${selectedCount > 0 ? `, ${selectedCount} selected` : ''}`}
      >
        <span className="tray-section-title">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8"
             viewBox="0 0 14 8" fill="none" aria-hidden="true"
             className="tray-section-chevron">
          <path
            d="M5.98129 7.32316C6.35238 7.69426 6.95504 7.69426 7.32613 7.32316L13.0261 1.62316C13.3972 1.25207 13.3972 0.649414 13.0261 0.27832C12.655 -0.0927734 12.0524 -0.0927734 11.6813 0.27832L6.65223 5.30738L1.62316 0.281289C1.25207 -0.089805 0.649414 -0.089805 0.27832 0.281289C-0.0927734 0.652383 -0.0927734 1.25504 0.27832 1.62613L5.97832 7.32613L5.98129 7.32316Z"
            fill="#43423E"/>
        </svg>
      </button>
      <ul id={listId} className="tray-option-list" role="group" aria-labelledby={toggleId} hidden={!open}>
          {items.map(item => (
            <li key={item.value} className="tray-option-item">
              <button
                role="checkbox"
                aria-checked={item.isRefined}
                className={`tray-option-btn${item.isRefined ? ' tray-option-btn--checked' : ''}`}
                onClick={() => refine(item.value)}
                aria-label={item.label}
              >
                <span className="tray-checkbox" aria-hidden="true">
                  {item.isRefined && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 3.5L3.5 6.5L9 1" stroke="white"
                            stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
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
    </div>
  )
}

const MediaFilters = () => {
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const trayCloseRef = useRef<HTMLButtonElement>(null)
  const {lock: lockScroll, unlock: unlockScroll} = useScrollLock({autoLock: false})
  const {refine: clearAll} = useClearRefinements()
  const {items: currentRefinements} = useCurrentRefinements()
  const {width = 0} = useWindowSize()
  const {nbHits} = usePagination({padding: 2})
  const {attributesToRender} = useDynamicWidgets()

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
    if (trayOpen) {
      lockScroll()
      // Move focus to close button when tray opens
      trayCloseRef.current?.focus()
    }
    if (!trayOpen) unlockScroll()
    return () => unlockScroll()
  }, [trayOpen])

  // Synchronously enforce inert after every render so Preact reconciliation can't undo it
  useLayoutEffect(() => {
    const trayEl = ref.current
    if (!trayEl) return
    if (trayOpen) {
      trayEl.removeAttribute('inert')
    } else {
      trayEl.setAttribute('inert', '')
    }
  })

  // Close tray on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && trayOpen) {
        closeTray()
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [trayOpen])

  const firstAttributes = width > 992 ? attributesToRender.slice(0, 2) : []
  const trayAttributes = [...attributesToRender]

  const allActiveTags = currentRefinements.flatMap(refinement =>
    refinement.refinements.map(item => ({
      label: item.label,
      refine: () => refinement.refine(item),
    }))
  )
  const hasActive = allActiveTags.length > 0

  return (
    <Filters className="media-filters-wrapper" role="region" aria-label="Media search filters">
      <div className="filter-top-row">
        <p className="results-counter" aria-live="polite" aria-atomic="true">{nbHits} results</p>
        <div className="filters" role="group" aria-label="Filter controls">
          <SearchBox/>
          {!!firstAttributes.length &&
            <div className="primary-filters">
              {firstAttributes.map(attribute =>
                <Refinement key={attribute} attribute={attribute}/>
              )}
            </div>
          }
          {!!trayAttributes.length &&
            <div className="additional-filters">
              <button
                ref={buttonRef}
                onClick={toggleTray}
                className="all-filters-btn"
                aria-expanded={trayOpen}
                aria-controls="filter-tray"
                aria-haspopup="dialog"
                aria-label={`${trayOpen ? 'Close' : 'Open'} filters panel${allActiveTags.length > 0 ? `, ${allActiveTags.length} active` : ''}`}
              >
                {width <= 991 &&
                  <>
                    <span className="all-filters-label">
                      Filter{allActiveTags.length > 0 ? ` (${allActiveTags.length})` : ''}
                    </span>{' '}
                    <span className="all-filters-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                        <path d="M6.16687 5.03687C6.47937 5.34937 6.47937 5.85687 6.16687 6.16937L1.36687 10.9694C1.05437 11.2819 0.546875 11.2819 0.234375 10.9694C-0.078125 10.6569 -0.078125 10.1494 0.234375 9.83687L4.46937 5.60187L0.236875 1.36687C-0.0756252 1.05437 -0.0756252 0.546875 0.236875 0.234375C0.549375 -0.078125 1.05687 -0.078125 1.36937 0.234375L6.16937 5.03437L6.16687 5.03687Z" fill="#43423E"/>
                      </svg>
                    </span>
                  </>
                }
                {width > 991 &&
                  <>
                    <span className="all-filters-label all-filters-btn__text">
                      All Filters{allActiveTags.length > 0 ? ` (${allActiveTags.length})` : ''}
                    </span>{' '}
                    <i className="fa-solid fa-sliders all-filters-icon" aria-hidden="true"></i>
                  </>
                }
              </button>
            </div>
          }
        </div>
      </div>

      {width >= 1500 && hasActive && (
        <div className="active-filters-bar" role="region" aria-label="Active filters">
          {allActiveTags.map((tag, i) => (
            <button key={i} className="active-filter-tag" onClick={tag.refine} type="button" aria-label={`Remove filter: ${tag.label}`}>
              <span className="active-filter-tag__text">{tag.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true" className="active-filter-tag__icon">
                <path d="M1 1L9 10M9 1L1 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          ))}
          <button className="active-filters-clear" onClick={() => clearAll()} type="button" aria-label="Clear all active filters">Clear All</button>
        </div>
      )}

      {!!trayAttributes.length &&
        <FilterTray
          $open={trayOpen}
          ref={ref}
          id="filter-tray"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tray-title-heading"
        >
          <div className="tray-header">
            <span id="tray-title-heading" className="tray-title">Filters</span>
            <button ref={trayCloseRef} className="tray-close" onClick={() => { closeTray(); buttonRef.current?.focus(); }} aria-label="Close filters panel">
              <i class="fa-solid fa-close" aria-hidden="true"></i>
            </button>
          </div>

            <div className="tray-body">
              {trayAttributes.map(attribute =>
                <TrayRefinement
                  key={attribute}
                  attribute={attribute}
                />
              )}
            </div>

          <div className="tray-footer">
            <button className="tray-clear" onClick={() => { clearAll(); }} aria-label={allActiveTags.length > 0 ? `Clear all filters, ${allActiveTags.length} active` : 'Clear all filters'}>
              Clear All
            </button>
            <button className="tray-view-results" onClick={() => { closeTray(); buttonRef.current?.focus(); }} aria-label={`View ${nbHits} result${nbHits !== 1 ? 's' : ''} and close panel`}>
              View Results
            </button>
          </div>
        </FilterTray>
      }
    </Filters>
  )
}
export default MediaFilters
