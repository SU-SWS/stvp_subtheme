import styled from "styled-components";

export const UnstyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    &.media-search__container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;

        .media-search__card {
            width: calc((100% - 96px) / 3);
            padding: 27px; /* add ms1 */
        }
    }
`
export const PaginationList = styled.ul`

`
export const AlgoliaSearchContainer = styled.div`

`
export const ComboBoxPortalStyle = styled.div`

`
export const ComboBoxStyle = styled.div`
    input {
        border-radius: 40px;
        border: 1px solid #C0C0BF;
        background: #FFF;
        padding: 10px 20px;
    }
`
export const Filters = styled.div`
    &.media-filters-wrapper {
        display: flex;
        justify-content: flex-start;
        max-width: 1300px;
        margin: 38px 0 38px;
    }

    .filters {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;

        input {
            border-radius: 40px;
            border: 1px solid #C0C0BF;
            background: #FFF;
            padding: 10px 20px;
        }
    }

    .additional-filters {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        > button {
            background: #FFF;
            border: none;
            padding: 8px 16px;
            border-radius: 40px;
            white-space: nowrap;

            i {
                color: #43423E;
            }
        }
    }
`
export const FilterTray = styled.div`

`
export const SearchForm = styled.form`

`
export const SearchInput = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;

    input {
        border-radius: 40px;
        border: 1px solid #C0C0BF;
        background: #FFF;
        padding: 10px 160px 10px 20px;
    }

    .search-buttons {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 4px;
    }

    button {
        background: none;

        i {
            color: #B1040E;
        }

        &:hover i {
            color: #820000;
        }
    }
`
