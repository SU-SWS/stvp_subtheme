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
            border: 1px solid var(--primary-black-20, #D5D5D4);
            position: relative;

            a {
            color: var(--Primary-Black, #2E2D29);
            /* Source Sans/Type 0 - bold */
            font-family: var(--Family-Source-Sans, "Source Sans 3");
            font-size: var(--Font-size-XXL-Type-0, 19px);
            font-style: normal;
            font-weight: 700;
            line-height: 140%; /* 26.6px */}

            .media-search__card-label {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                margin-top: 10px;
                bottom: 0;
                left: 0;
                border-radius: 2px;
                background: var(--Primary-SU-Cool-Grey, #53565A);
                color: #FFF;
                padding: 4px 10px;
                font-size: 13px;
            }
        }
    }
`
export const PaginationList = styled.ul`

`
export const AlgoliaSearchContainer = styled.div`

`
export const ComboBoxPortalStyle = styled.div`
    .combo-positioner {
        position: absolute;
        left: 576.333px;
        top: 50px;
        z-index: 100;
    }

    .combo-popup {
        display: flex;
        flex-direction: column;
        width: 300px;
        background: #FFF;
        border: 1px solid #C0C0BF;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .combo-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .combo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: var(--spacing-ms-1, 27px);
        cursor: pointer;

        &:hover {
            background: #F4F4F4;
        }

        &[data-selected] input[type="checkbox"]:after {
            content: "✓";
            position: absolute;
            background: #B1040E;
            border-color: #B1040E;
            color: white;
            line-height: 16px;
        }

        .combo-item-indicator {
            display: flex;
            align-items: center;
        }

        .combo-checkbox {
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border: 1px solid #C0C0BF;
            background: #FFF;
            cursor: pointer;
            clip-path: unset;

            &:checked {
                background: #B1040E;
                border-color: #B1040E;
            }
        }
    }

    .combo-empty {
        padding: 12px var(--spacing-ms-1, 27px);
        color: #8F8C89;
    }
`
export const ComboBoxStyle = styled.div`
    input,
    .combo-input {
        border-radius: 40px;
        border: 1px solid #C0C0BF;
        background: #FFF;
        padding: 10px 20px;
    }

    .combo-input {
        display: inline-flex;
        align-items: center;
        min-width: 80px;
        gap: 5px;
        cursor: pointer;
        color: var(--Primary-Black, #2E2D29);
        text-decoration: none;
        margin: .2em 0;
        font-size: 16px;

        &:focus {
            box-shadow: 0 0 1px #53565a, 0 0 2px #53565a;
        }
    }

    .combo-chevron {
        transition: transform 0.2s ease;
    }

    .combo-chevron.is-open {
        transform: rotate(180deg);
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
        width: 100%;
        gap: 20px;

        input {
            border-radius: 40px;
            border: 1px solid #C0C0BF;
            background: #FFF;
            padding: 10px 20px;
        }
    }

    .primary-filters {
        display: flex;
        gap: 20px;

        .input-wrapper {
            display: flex;
            gap: 5px;

            .input-clear {
                display: flex;
                justify-content: center;
                flex-direction: column;

                button {
                    border-radius: 30px;
                    padding: 1rem;
                    border-radius: 30px;
                    height: 35px;

                    i {
                        height: 15px;
                        width: 15px;
                        line-height: 15px;
                    }
                }
            }
        }
    }

    .additional-filters {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        > button {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
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
