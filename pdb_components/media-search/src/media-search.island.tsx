import {liteClient} from 'algoliasearch/lite';
import {createIsland} from 'preact-island'
import {InstantSearch, Configure} from 'react-instantsearch';
import {AlgoliaSearchContainer} from "./styled-components";
import ResultHits from "./components/result-hits";
import MediaFilters from "./components/media-filters";
import {IndexUiState} from "instantsearch.js/es/types/ui-state";

const islandName = 'media-search';

/* global window */
// @ts-ignore
const appId = window.drupalSettings?.stanfordAlgolia.appId || process.env.ALGOLIA_APP_ID
// @ts-ignore
const key = window.drupalSettings?.stanfordAlgolia.searchKey || process.env.ALGOLIA_KEY

const searchClient = liteClient(appId, key);


const Search = ({index, filter}: { index?: string, filter?: string }) => {
  // @ts-ignore
  const searchIndex = index || window.drupalSettings?.stanfordAlgolia.index || process.env.ALGOLIA_INDEX;

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={searchIndex}
      insights={true}
      routing={{
        stateMapping: {
          stateToRoute(uiState): Record<string, string> {
            const {query, refinementList} = uiState[searchIndex]
            const routeState: Record<string, string> = {}

            if (query) routeState.key = query

            if (typeof refinementList === "object") {
              Object.keys(refinementList).map(attribute => {
                routeState[attribute] = refinementList[attribute].join(',')
              })
            }

            return routeState
          },
          routeToState(routeState: Record<string, string>) {
            const initialUiState: IndexUiState = {}
            if (routeState.key) initialUiState.query = routeState.key

            Object.keys(routeState).map(attribute => {
              if (typeof initialUiState.refinementList === 'undefined') {
                initialUiState.refinementList = {}
              }
              initialUiState.refinementList[attribute] = routeState[attribute].split(',')
            })
            return {
              [searchIndex]: initialUiState,
            }
          },
        },
      }}
    >
      <Configure filters={filter || "type:Audio/Visual"}/>
      <AlgoliaSearchContainer className="media-search--container-wrapper">
        {/* <h2 className="media-search__title">Video, Podcasts, and Rich Media</h2> */}
        <div className="media-filters-area">
          <MediaFilters/>
        </div>
        <ResultHits/>
      </AlgoliaSearchContainer>
    </InstantSearch>

  )
}

const island = createIsland(Search)

// Drupal may place this block more than once in its layout config, which puts
// multiple <media-search> elements on the page. Hide all but the first,
// including their surrounding Drupal block wrapper so block labels/titles don't leak.
const allEls = document.querySelectorAll(`${islandName}, #${islandName}`);

Array.from(allEls).slice(1).forEach(el => {
  // Walk up to the nearest .block wrapper; that contains the block label heading too
  const blockWrapper = el.closest('.block') as HTMLElement | null
  const target = blockWrapper ?? (el as HTMLElement)
  target.style.display = 'none'
  target.setAttribute('aria-hidden', 'true')
})

if (!(window as any).__mediaSearchIslandMounted) {
  ;(window as any).__mediaSearchIslandMounted = true
  type PDBConfig = Record<string, string>
  type MediaConfig = {
    media_search_index?: string,
    media_search_filters?: string
  }

  // @ts-ignore
  const pdbConfig: Record<string, PDBConfig> = window?.drupalSettings?.pdb?.configuration || {}
  const mediaConfig: MediaConfig = Object.values(pdbConfig).find((config) => typeof config.media_search_index !== "undefined" || typeof config.media_search_filters !== "undefined") as MediaConfig

  // Use :first-of-type so preact-island only renders into the first element
  // even if multiple <media-search> elements exist in the DOM.
  island.render({
    selector: `${islandName}:first-of-type`,
    initialProps: {
      index: mediaConfig?.media_search_index || undefined,
      filter: mediaConfig?.media_search_filters || undefined
    }
  })
}
