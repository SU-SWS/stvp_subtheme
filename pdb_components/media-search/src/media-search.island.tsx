import {liteClient} from 'algoliasearch/lite';
import {createIsland} from 'preact-island'
import {InstantSearch, Configure} from 'react-instantsearch';
import {AlgoliaSearchContainer} from "./styled-components";
import ResultHits from "./components/result-hits";
import MediaFilters from "./components/media-filters";
import {IndexUiState} from "instantsearch.js/es/types/ui-state";

const islandNames = ['media-search', 'media_search']

/* global window */
// @ts-ignore
const appId = window.drupalSettings?.stanfordAlgolia.appId || process.env.ALGOLIA_APP_ID
// @ts-ignore
const key = window.drupalSettings?.stanfordAlgolia.searchKey || process.env.ALGOLIA_KEY

const searchClient = liteClient(appId, key);


const Search = () => {
  // @ts-ignore
  const searchIndex = window.drupalSettings?.stanfordAlgolia.index || process.env.ALGOLIA_INDEX;

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
      <Configure filters="type:Audio/Visual"/>
      <AlgoliaSearchContainer className="media-search--container-wrapper">
        <h2 className="media-search__title">Video, Podcasts, and Rich Media</h2>
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
const allEls = document.querySelectorAll(
  islandNames.map((name) => `${name}, #${name}`).join(', ')
)
Array.from(allEls).slice(1).forEach(el => {
  // Walk up to the nearest .block wrapper; that contains the block label heading too
  const blockWrapper = el.closest('.block') as HTMLElement | null
  const target = blockWrapper ?? (el as HTMLElement)
  target.style.display = 'none'
  target.setAttribute('aria-hidden', 'true')
})

if (!(window as any).__mediaSearchIslandMounted) {
  ;(window as any).__mediaSearchIslandMounted = true
  // Render to whichever selector exists first (dash or underscore variant).
  const selector = islandNames
    .map((name) => `${name}:first-of-type`)
    .find((candidate) => document.querySelector(candidate))
    || islandNames
      .map((name) => `#${name}`)
      .find((candidate) => document.querySelector(candidate))

  if (selector) {
    island.render({selector})
  }
}
