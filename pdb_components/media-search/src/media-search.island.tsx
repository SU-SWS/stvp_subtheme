import {liteClient} from 'algoliasearch/lite';
import {createIsland} from 'preact-island'
import {InstantSearch, Configure} from 'react-instantsearch';
import {AlgoliaSearchContainer} from "./styled-components";
import ResultHits from "./components/result-hits";
import MediaFilters from "./components/media-filters";
import {IndexUiState} from "instantsearch.js/es/types/ui-state";

const islandName = 'media-search'

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
      <AlgoliaSearchContainer>
        <MediaFilters/>
        <ResultHits/>
      </AlgoliaSearchContainer>
    </InstantSearch>

  )
}

const island = createIsland(Search)
island.render({
  selector: `${islandName}, #${islandName}`,
})
