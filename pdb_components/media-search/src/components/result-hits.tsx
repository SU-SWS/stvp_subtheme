import {useHits, usePagination} from 'react-instantsearch';
import {PaginationList, UnstyledList} from "../styled-components";
import type {BaseHit} from "instantsearch.js";

type DrupalBaseHit = BaseHit & {
  objectId: string
  title: string
  summary?: string
  html?: string
  type: string
  photo?: string
  url: string
  created: number
  updated: number
}
type Media = DrupalBaseHit & {
  type: "Audio/Visual"
  media_season?: string
  media_series?: string
  media_icon?: "video" | "audio" | "podcast" | "media"
  media_date?: number
  media_duration?: number
  media_episode?: string
}
type News = DrupalBaseHit & {
  type: "News"
  news_type?: string | Array<string>
  summary?: string
}
type Person = DrupalBaseHit & {
  type: "Person"
  person_type?: string | Array<string>
  person_full_title?: string
}

const ResultHits = ({...props}) => {
  const {items: hits} = useHits<Media | News | Person>(props);
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

  const getCardTypeClass = (type: string): string => {
  const typeMap: Record<string, string> = {
    'Audio/Visual': 'media',
    'News': 'news',
    'Person': 'person'
  };
  return typeMap[type] || 'default';
};

  return (
    <div className="media-search__wrapper">
      <h2 className="visually-hidden">Results</h2>
      <UnstyledList className="media-search__container">
        {hits.map(hit =>
          <li className={`media-search__card media-search__card--${getCardTypeClass(hit.type)}`}
            key={hit.objectID}>
            {hit.type === "Audio/Visual" && <MediaHit hit={hit}/>}
            {hit.type === "News" && <NewsHit hit={hit}/>}
            {hit.type === "Person" && <PersonHit hit={hit}/>}
          </li>
        )}
      </UnstyledList>

      {pages.length > 1 && (
        <nav aria-label="Search results pager" className="media-search__pager">
          <PaginationList>

            {currentPage > 0 &&
              <li>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  aria-label="Go to previous page"
                >
                  Previous
                </button>
              </li>
            }

            {pages.map(pageNum => (
              <li key={`page-${pageNum}`}>
                <button
                  className="page-number"
                  onClick={() => goToPage(pageNum)}
                  aria-label={`Page ${pageNum + 1}${currentPage === pageNum ? ', current page' : ''}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum + 1}
                </button>
              </li>
            ))}

            {currentPage != nbPages - 1 &&
              <li>
                <button onClick={() => goToPage(currentPage + 1)}
                        aria-label="Go to next page">
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

const MediaHit = ({hit}: { hit: Media }) => {
  return (
    <>
      <div className={`media-search__card-image${(hit as any).photo ? '' : ' media-search__card-image--no-image'}`}>
        {(hit as any).photo &&
          <img src={(hit as any).photo} alt="" aria-hidden="true"/>}
        {/* TODO: Add placeholder image
                {!(hit as any).photo && <img src="" alt="" aria-hidden="true" />}
              */}
      </div>
      <div className="media-search__card-body">
        <div className="media-search__card-title-group">
          <h3 style={{lineHeight: '120%', margin: 0}}><a
            href={hit.url}>{hit.title}</a></h3>
          {(() => {
            const series = (hit as any).media_series;
            const type = (hit as any).media_type;
            const tag = series || type;
            if (!tag) return null;
            const label = Array.isArray(tag) ? tag[0] : tag;
            return <span className="media-search__card-series">{label}</span>;
          })()}
        </div>
        {(hit as any).media_icon === 'podcast' ? (
          <span className="media-search__card-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                 viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M10.125 9.93281C11.0414 9.17578 11.625 8.03203 11.625 6.75C11.625 4.47188 9.77813 2.625 7.5 2.625C5.22188 2.625 3.375 4.47188 3.375 6.75C3.375 8.03203 3.95859 9.17578 4.875 9.93281C4.88438 10.3453 4.95 10.8797 5.025 11.3813C3.375 10.4977 2.25 8.75391 2.25 6.75C2.25 3.85078 4.60078 1.5 7.5 1.5C10.3992 1.5 12.75 3.85078 12.75 6.75C12.75 8.75625 11.625 10.4977 9.97266 11.3813C10.05 10.8797 10.1133 10.3453 10.1227 9.93281H10.125ZM9.79688 8.68125C9.60234 8.38594 9.34688 8.175 9.08438 8.02969C9.03516 8.00391 8.98594 7.97813 8.93672 7.95469C9.21094 7.62891 9.37734 7.20703 9.37734 6.74766C9.37734 5.71172 8.53828 4.87266 7.50234 4.87266C6.46641 4.87266 5.62734 5.71172 5.62734 6.74766C5.62734 7.20703 5.79375 7.62891 6.06797 7.95469C6.01875 7.97813 5.96953 8.00156 5.92031 8.02969C5.65781 8.175 5.40234 8.38594 5.20781 8.68125C4.76719 8.15859 4.50234 7.48594 4.50234 6.75C4.50234 5.09297 5.84531 3.75 7.50234 3.75C9.15938 3.75 10.5023 5.09297 10.5023 6.75C10.5023 7.48594 10.2375 8.16094 9.79688 8.68125ZM7.5 8.8125C8.27109 8.8125 9 9.01406 9 9.83906C9 10.6125 8.69766 12.2789 8.51719 12.9539C8.39766 13.3992 7.94297 13.5023 7.5 13.5023C7.05703 13.5023 6.60469 13.3992 6.48281 12.9539C6.3 12.2859 6 10.6172 6 9.84141C6 9.01875 6.72891 8.81485 7.5 8.81485V8.8125ZM7.5 5.8125C8.01797 5.8125 8.4375 6.23203 8.4375 6.75C8.4375 7.26797 8.01797 7.6875 7.5 7.6875C6.98203 7.6875 6.5625 7.26797 6.5625 6.75C6.5625 6.23203 6.98203 5.8125 7.5 5.8125Z"
                    fill="white"/>
            </svg>
            Podcast
          </span>
        ) : (
          <span className="media-search__card-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                 viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M3 3C2.17266 3 1.5 3.67266 1.5 4.5V10.5C1.5 11.3273 2.17266 12 3 12H9C9.82734 12 10.5 11.3273 10.5 10.5V4.5C10.5 3.67266 9.82734 3 9 3H3ZM11.625 9.375L13.3477 10.7531C13.4461 10.8328 13.568 10.875 13.6945 10.875C14.0016 10.875 14.25 10.6266 14.25 10.3195V4.68047C14.25 4.37344 14.0016 4.125 13.6945 4.125C13.568 4.125 13.4461 4.16719 13.3477 4.24687L11.625 5.625V9.375Z"
                fill="white"/>
            </svg>
            Video
          </span>
        )}
      </div>
    </>
  )
}
const PersonHit = ({hit}: { hit: Person }) => {
  return <MediaHit hit={hit}/>
}
const NewsHit = ({hit}: { hit: News }) => {
  return <MediaHit hit={hit}/>
}

export default ResultHits
