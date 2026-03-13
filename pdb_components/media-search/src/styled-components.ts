import styled from "styled-components";

export const UnstyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    &.media-search__container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 48px;
        row-gap: 32px;

        .media-search__card {
            width: 100%;
            border: 1px solid var(--primary-black-20, #D5D5D4);
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            a {
                color: var(--Primary-Black, #2E2D29);
                /* Source Sans/Type 0 - bold */
                font-family: var(--Family-Source-Sans, "Source Sans 3");
                font-size: var(--Font-size-XXL-Type-0, 19px);
                font-style: normal;
                font-weight: 700;
                line-height: 120%;
            }

            .media-search__card-image {
                width: 100%;
                height: 180px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                overflow: hidden;
                padding: var(--spacing-ms-1, 27px) var(--spacing-ms-1, 27px) 0;
                box-sizing: border-box;

                &.media-search__card-image--no-image {
                    background: #F4F4F4;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .media-search__card-body {
                padding: 20px 27px 27px;
                display: flex;
                flex-direction: column;
                flex: 1;
                gap: 8px;
            }

            .media-search__card-title-group {
                display: flex;
                flex-direction: column;
                gap: 3px;

                a {
                    line-height: 120%;
                }
            }

            .media-search__card-series {
                display: inline-flex;
                align-items: center;
                font-size: 15px;
                color: var(--Primary-Black, #2E2D29);
            }

            .media-search__card-label {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                border-radius: 2px;
                background: var(--Primary-SU-Cool-Grey, #53565A);
                color: #FFF;
                padding: 4px 10px;
                font-size: 13px;
                align-self: flex-start;
                margin-top: auto;
            }
        }

        @media (max-width: 991px) {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 24px;

            .media-search__card {
                width: 100%;
            }
        }

        @media (max-width: 550px) {
            grid-template-columns: 1fr;
            column-gap: 0;

            .media-search__card {
                width: 100%;
            }
        }
    }
`
export const PaginationList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 24px 0;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 16px;
    flex-wrap: nowrap;

    && li {
        display: inline-flex !important;
        align-items: center !important;
        height: 34px;
        margin: 0;
        padding: 0;
    }

    /* Page number buttons — default (not current) */
    && button.page-number {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 33px;
        height: 34px;
        box-sizing: border-box;
        background: none !important;
        border: none !important;
        border-bottom: 2px solid transparent !important;
        padding: 2px 0 4px 0;
        cursor: pointer;
        color: var(--Interactive-Digital-Red, #B1040E);
        text-align: center;
        font-family: "Source Sans 3";
        font-size: 22.5px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        outline: none !important;
        box-shadow: none !important;
        text-decoration: none !important;

        &:focus, &:focus-visible, &:active {
            outline: none !important;
            box-shadow: none !important;
            text-decoration: none !important;
            border-color: transparent !important;
        }

        &:hover {
            border-bottom-color: var(--Interactive-Digital-Red, #B1040E) !important;
        }
    }

    /* Active / current page */
    && button.page-number[aria-current="page"] {
        color: var(--Primary-Black, #2E2D29);
        border-bottom-color: var(--Primary-Black, #2E2D29) !important;
        cursor: default;
        outline: none !important;
        box-shadow: none !important;
        text-decoration: none !important;

        &:focus, &:focus-visible, &:active {
            outline: none !important;
            box-shadow: none !important;
            text-decoration: none !important;
            border-bottom-color: var(--Primary-Black, #2E2D29) !important;
        }

        &:hover {
            border-bottom-color: var(--Primary-Black, #2E2D29) !important;
        }
    }

    /* Previous / Next buttons */
    && button:not(.page-number) {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 30px;
        background: none !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        text-decoration: none !important;
        padding: 0 8px;
        cursor: pointer;
        color: var(--Interactive-Digital-Red, #B1040E);
        text-align: center;
        font-family: "Source Sans 3", sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;

        &:focus, &:focus-visible, &:active {
            outline: none !important;
            box-shadow: none !important;
            text-decoration: none !important;
            border: none !important;
        }
    }
`
export const AlgoliaSearchContainer = styled.div`
    padding: 0 50px;

    @media (max-width: 991px) {
        padding: 0 30px;
    }

    @media (max-width: 768px) {
        padding: 0 20px;
    }

    @media (max-width: 460px) {
        padding: 0 10px;
    }
`
export const DropDownListPortalStyle = styled.div`
    .dropdown-positioner {
        z-index: 100;
        /* Base UI Positioner sets inline transform; offset via margins. */
        margin-left: -20px;
        margin-top: 20px;
    }

    .dropdown-popup {
        display: flex;
        flex-direction: column;
        width: 300px;
        max-height: 406px;
        background: #FFF;
        border: 1px solid #C0C0BF;
        border-radius: 8px;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

        &:focus, &:focus-visible {
            outline: none !important;
        }

        li {
            margin: var(--spacing-ms-0, 9px) 0;
        }
    }

    .dropdown-list {
        list-style: none;
        margin: var(--spacing-ms-0, 9px) 0;
        padding: 27px 0;

        &:focus, &:focus-visible {
            outline: none !important;
        }
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1px var(--spacing-ms-1, 27px);
        cursor: pointer;

        &:hover {
            background: #F4F4F4;
        }
        
        &:focus, &:focus-visible {
            outline: 1px solid #C0C0BF;
        }

        .dropdown-item-indicator {
            display: flex;
            align-items: center;
        }

        .dropdown-checkbox {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border: 2.5px solid #C0C0BF;
            background: #FFF;
        }

        &[data-checked] .dropdown-checkbox,
        &[data-selected] .dropdown-checkbox {
            background: #B1040E;
            border-color: #B1040E;
        }

        &:hover .dropdown-checkbox {
            border-color: #B1040E;
        }
    }

    .dropdown-empty {
        padding: 12px var(--spacing-ms-1, 27px);
        color: #8F8C89;
    }
`
export const DropDownListStyle = styled.div`
    display: inline-flex;
    align-items: center;

    .input-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 40px;
        border: 1px solid #C0C0BF;
        background: #FFF;
        padding: 3px 20px;
        height: 40px;
        gap: 6px;
        cursor: pointer;
        box-sizing: border-box;
        
        &:focus-within {
            box-shadow: 2px 0 4px rgba(0, 0, 0, 0.12);
        }
    }

    .dropdown-input {
        -webkit-appearance: none;
        appearance: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: none;
        background: none;
        outline: none;
        box-shadow: none;
        text-decoration: none;
        font-size: 16px;
        color: #2E2D29;
        min-width: 60px;
        width: auto;
        field-sizing: content;
        cursor: pointer;
        padding: 0;
        height: auto;
        line-height: 1;

        &:hover {
            text-decoration: underline;
        }

        &::placeholder {
            color: #2E2D29;
        }
    }

    .input-clear {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .dropdown-clear {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: #43423E;
    }

    .dropdown-chevron {
        display: block;
        align-self: center;
        flex-shrink: 0;
        transition: transform 0.2s ease;
    }

    .dropdown-chevron.is-open {
        transform: rotate(180deg);
    }
`
export const Filters = styled.div`
    &.media-filters-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 1300px;
        margin: 38px 0 38px;
        gap: 12px;
    }

    .filter-top-row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;

        @media (max-width: 991px) {
            flex-wrap: wrap;
            gap: 12px;
        }
    }

    .results-counter {
        white-space: nowrap;
        min-width: 130px;
        flex-shrink: 0;
        margin: 0;
        align-self: center;
        color: var(--primary-black-80, #585754);
        font-family: var(--Family-Source-Sans, "Source Sans 3");
        font-size: var(--Font-size-XXL-Type-0, 19px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (max-width: 991px) {
            width: 100%;
        }
    }

    .active-filters-bar {
        display: none;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        padding-left: 0;

        @media (min-width: 1500px) {
            display: flex;
        }
    }

    .active-filter-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        border: none;
        background: none;
        font-size: 15px;
        color: #2E2D29;
        cursor: pointer;
        white-space: nowrap;

        &:focus, &:focus-visible {
            outline: none !important;
            box-shadow: none !important;
        }

        .active-filter-tag__icon {
            color: #2E2D29;
            flex-shrink: 0;
        }

        &:hover, &:focus-visible {
            .active-filter-tag__text {
                text-decoration: underline;
            }
            .active-filter-tag__icon {
                color: #B1040E;
            }
        }
    }

    .active-filters-clear {
        background: none;
        border: none;
        padding: 4px 4px;
        font-size: 15px;
        color: #2E2D29;
        cursor: pointer;
        text-decoration: underline;
        white-space: nowrap;

        &:focus, &:focus-visible {
            outline: none !important;
            box-shadow: none !important;
        }

        &:hover, &:focus-visible {
            color: #B1040E;
        }
    }

    .filters {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 17px;
    }

    .primary-filters {
        display: flex;
        gap: 17px;
        height: 56px;
        align-items: center;

        @media (max-width: 991px) {
            display: none;
        }
    }

    .additional-filters {
        display: inline-flex;
        align-items: center;
        z-index: 1;

        > button, > .all-filters-btn {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            background: #FFF;
            border: 1px solid #C0C0BF;
            padding: 0 22px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 40px;
            white-space: nowrap;
            cursor: pointer;
            color: #2E2D29;
            font-size: 16px;

            &:hover {
                .all-filters-btn__text {
                    text-decoration: underline;
                }

                i::before {
                    text-decoration: none;
                }
            &:hover, &:focus {
                text-decoration: none;
            }

            &:hover .all-filters-label, &:focus .all-filters-label {
                text-decoration: underline;
            }

            .all-filters-icon,
            i {
                color: #43423E;
                text-decoration: none !important;
                display: inline-flex;
            }

            &:hover .all-filters-icon,
            &:focus .all-filters-icon,
            &:hover i {
                text-decoration: none !important;
            }
        }
    }
`
export const FilterTray = styled.div<{ $open?: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 380px;
    background: #FFF;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transform: translateX(${({$open}) => $open ? '0' : '100%'});
    transition: transform 0.3s ease;

    button, [role="checkbox"], input {
        &:focus, &:focus-visible {
            outline: none;
            box-shadow: none;
        }
    }

    @media (max-width: 991px) {
        width: 100vw;
        height: 100vh;
        left: 0;
        right: 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .tray-header,
        .tray-body,
        .tray-footer {
            width: 100%;
            box-sizing: border-box;
        }

        .tray-section,
        .tray-section-toggle {
            width: 100%;
            box-sizing: border-box;
        }
    }

    @media (max-width: 360px) {
        width: 100vw;
        height: 100vh;
        left: 0;
        right: 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .tray-header,
        .tray-body,
        .tray-footer {
            width: 100%;
            box-sizing: border-box;
        }

        .tray-section,
        .tray-section-toggle {
            width: 100%;
            box-sizing: border-box;
        }
    }

    .tray-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 27px;
        border-bottom: 1px solid #D5D5D4;

        .tray-title {
            font-size: 18px;
            font-weight: 700;
            color: #2E2D29;
        }

        .tray-close {
            background: none;
            border: none;
            padding: 4px;
            cursor: pointer;
            font-size: 18px;
            color: #2E2D29;
        }
    }

    .tray-body {
        flex: 1;
        overflow-y: auto;
        padding: 0 27px;
        display: flex;
        flex-direction: column;
    }

    .tray-section {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #D5D5D4;
        padding-bottom: 0;

        .tray-section-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            background: none;
            border: none;
            padding: 16px 0;
            cursor: pointer;
            text-align: left;
        }

        .tray-section-title {
            font-size: 15px;
            font-weight: 700;
            color: #2E2D29;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        .tray-section-chevron {
            flex-shrink: 0;
            transition: transform 0.2s ease;
        }

        &.tray-section--open .tray-section-chevron {
            transform: rotate(180deg);
        }

        .tray-option-list {
            list-style: none;
            margin: 0;
            padding: 0 0 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .tray-option-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 15px;
            color: #2E2D29;
            background: none;
            border: none;
            padding: 0;
            width: 100%;
            text-align: left;

            &:hover .tray-checkbox {
                border-color: #B1040E;
            }
        }

        .tray-option-text {
            flex: 1;
        }

        .tray-checkbox {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border: 2.5px solid #C0C0BF;
            background: #FFF;
        }

        .tray-option-btn--checked .tray-checkbox {
            background: #B1040E;
            border-color: #B1040E;
        }

        .tray-option-empty {
            font-size: 14px;
            color: #8F8C89;
            padding-bottom: 8px;
        }
    }

    .tray-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 27px;
        border-top: 1px solid #D5D5D4;

        .tray-clear {
            display: flex;
            padding: 9px 15px 11px 15px;
            align-items: center;
            border-radius: 3px;
            border: 1px solid var(--primary-black-20, #D5D5D4);
            background: var(--Primary-White, #FFF);
            font-size: 14px;
            color: #53565A;
            cursor: pointer;
        }

        .tray-view-results {
            display: flex;
            padding: 9px 13px 11px 13px;
            align-items: center;
            border-radius: 3px;
            border: 1px solid var(--Accent-Lagunita-Light, #009AB4);
            background: var(--Accent-Lagunita, #007C92);
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.10);
            color: #FFF;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;

            &:hover {
                background: #005f6e;
            }
        }
    }
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
        padding: 0 32px 0 26px;
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        line-height: normal;
        vertical-align: middle;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        z-index: 1;

        &::-webkit-search-cancel-button,
        &::-webkit-search-decoration,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
            -webkit-appearance: none;
            display: none !important;
        }

        &::placeholder {
            color: var(--Form-element-Text-Secondary, #6D6C69);
            text-align: left;
            font-family: var(--Family-Source-Sans, "Source Sans 3");
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
        }

        &:focus, &:focus-visible {
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08) !important;
        }
    }

    .search-buttons {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 4px;
        z-index: 2;
    }

    .divider {
        display: inline-block;
        width: 1px;
        height: 16px;
        background: #C0C0BF;
        margin: 0 4px;
        flex-shrink: 0;
        align-self: center;
    }

    button {
        background: transparent !important;
        border: none;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        i {
            color: #B1040E;
            line-height: 1;
        }

        &[type="submit"] i {
            font-size: 17px;
        }

        &[type="reset"] .clear-icon {
            color: #6D6C69;
            font-weight: normal;
        }

        &:hover, &:active, &:focus, &:focus-visible {
            background: transparent !important;
            outline: none !important;
            box-shadow: none !important;
        }

        &[type="submit"]:hover i,
        &[type="submit"]:active i,
        &[type="submit"]:focus i {
            color: #F83535;
        }

        &[type="reset"]:hover .clear-icon,
        &[type="reset"]:active .clear-icon,
        &[type="reset"]:focus .clear-icon {
            color: #F83535;
        }
    }
`
