import {Snippet, useHits, usePagination} from 'react-instantsearch';
import {PaginationList, UnstyledList} from "../styled-components";

const ResultHits = ({...props}) => {
  const {items: hits} = useHits(props);
  const {
    currentRefinement: currentPage,
    pages,
    nbPages,
    refine: goToPage
  } = usePagination({padding: 2})

  if (hits.length === 0) return (
    <p>
      No results for your search. Please try another search.
    </p>
  )

  return (
    <div>
      <h2 className="visually-hidden">Results</h2>
      <UnstyledList className="media-search__container">
        {hits.map(hit =>
          <li className="media-search__card" key={hit.objectID}>
            <div className="media-search__card-inner">
              <h3><a href={hit.url}>{hit.title}</a></h3>
              <Snippet hit={hit} attribute="html"/>
            </div>
          </li>
        )}
      </UnstyledList>

      {pages.length > 1 && (
        <nav aria-label="Search results pager">
          <PaginationList>

            {currentPage > 0 &&
              <li>
                <button onClick={() => goToPage(currentPage - 1)}>
                  <span className="visually-hidden">Go to previous page</span>
                  Previous
                </button>
              </li>
            }

            {pages.map(pageNum => (
              <li
                key={`page-${pageNum}`}
                aria-current={currentPage === pageNum}
              >
                <button
                  className="page-number"
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum + 1}
                </button>
              </li>
            ))}

            {currentPage != nbPages - 1 &&
              <li>
                <button onClick={() => goToPage(currentPage + 1)}>
                  <span className="visually-hidden">Go to next page</span>
                  Next
                </button>
              </li>
            }
          </PaginationList>
        </nav>
      )}
    </div>
  )
}

export default ResultHits
