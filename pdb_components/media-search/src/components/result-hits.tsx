import {useHits, usePagination} from 'react-instantsearch';
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
    <div style={{paddingBottom: '60px'}}>
      <h2 className="visually-hidden">Results</h2>
      <UnstyledList className="media-search__container">
        {hits.map(hit =>
          <li className="media-search__card" key={hit.objectID}>
            <div className="media-search__card-image">
              {(hit as any).photo && <img src={(hit as any).photo} alt="" aria-hidden="true" />}
              {/* TODO: Add placeholder image
                {!(hit as any).photo && <img src="" alt="" aria-hidden="true" />}
              */}
            </div>
            <div className="media-search__card-body">
              <div className="media-search__card-title-group">
                <h3 style={{lineHeight: '120%', margin: 0}}><a href={hit.url}>{hit.title}</a></h3>
                {(() => {
                  const series = (hit as any).media_series;
                  const type = (hit as any).media_type;
                  const tag = series || type;
                  if (!tag) return null;
                  const label = Array.isArray(tag) ? tag[0] : tag;
                  return <span className="media-search__card-series">{label}</span>;
                })()}
              </div>
              <span className="media-search__card-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 3C2.17266 3 1.5 3.67266 1.5 4.5V10.5C1.5 11.3273 2.17266 12 3 12H9C9.82734 12 10.5 11.3273 10.5 10.5V4.5C10.5 3.67266 9.82734 3 9 3H3ZM11.625 9.375L13.3477 10.7531C13.4461 10.8328 13.568 10.875 13.6945 10.875C14.0016 10.875 14.25 10.6266 14.25 10.3195V4.68047C14.25 4.37344 14.0016 4.125 13.6945 4.125C13.568 4.125 13.4461 4.16719 13.3477 4.24687L11.625 5.625V9.375Z" fill="white"/>
                </svg>
                Video
              </span>
            </div>
          </li>
        )}
      </UnstyledList>

      {pages.length > 1 && (
        <nav aria-label="Search results pager">
          <PaginationList>

            {currentPage > 0 &&
              <li>
                <button onClick={() => goToPage(currentPage - 1)} aria-label="Go to previous page">
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
                <button onClick={() => goToPage(currentPage + 1)} aria-label="Go to next page">
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
