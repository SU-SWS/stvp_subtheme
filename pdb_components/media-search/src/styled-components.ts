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

        @media (max-width: 991px) {
            .media-search__card {
                width: calc((100% - 48px) / 2);
            }
        }

        @media (max-width: 550px) {
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
        height: 36px;
        margin: 0;
        padding: 0;
    }

    /* Page number buttons — default (not current) */
    && button.page-number {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 36px;
        background: none;
        border: none;
        padding: 0 8px;
        cursor: pointer;
        color: var(--Interactive-Digital-Red, #B1040E);
        text-align: center;
        font-family: "Source Sans 3", sans-serif;
        font-size: 22.5px;
        font-style: normal;
        font-weight: 700;
        line-height: 1;
    }

    /* Active / current page */
    && li[aria-current="true"] button.page-number {
        color: var(--Primary-Black, #2E2D29);
        cursor: default;
    }

    /* Previous / Next buttons */
    && button:not(.page-number) {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 36px;
        background: none;
        border: none;
        padding: 0 8px;
        cursor: pointer;
        color: var(--Interactive-Digital-Red, #B1040E);
        text-align: center;
        font-family: "Source Sans 3", sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
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
    display: inline-flex;
    align-items: center;

    .input-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 40px;
        border: 1px solid #C0C0BF;
        background: #FFF;
        padding: 3px 14px;
        height: 40px;
        gap: 6px;
        cursor: pointer;
        box-sizing: border-box;
    }

    .combo-input {
        -webkit-appearance: none;
        appearance: none;
        border: none;
        background: none;
        outline: none;
        box-shadow: none;
        font-size: 14px;
        color: #2E2D29;
        min-width: 60px;
        width: auto;
        field-sizing: content;
        cursor: pointer;
        padding: 0;
        height: auto;
        line-height: 1;

        &::placeholder {
            color: #2E2D29;
        }
    }

    .input-clear {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .combo-clear {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: #43423E;
    }

    .combo-chevron {
        flex-shrink: 0;
        transition: transform 0.2s ease;
    }

    &[data-open] .combo-chevron {
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

    .results-counter {
        white-space: nowrap;
        min-width: 130px;
    }

    .filters {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    .primary-filters {
        display: flex;
        gap: 20px;
        height: 56px;
        align-items: center;
    }

    .additional-filters {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        > button, > .all-filters-btn {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            background: #FFF;
            border: 1px solid #C0C0BF;
            padding: 8px 16px;
            border-radius: 40px;
            white-space: nowrap;
            cursor: pointer;
            color: #2E2D29;

            i {
                color: #43423E;
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
            gap: 12px;
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
            border: 1.5px solid #C0C0BF;
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
        padding: 10px 160px 10px 20px;
        line-height: 1;
        vertical-align: middle;

        &::placeholder {
            color: var(--Form-element-Text-Secondary, #6D6C69);
            text-align: center;
            font-family: var(--Family-Source-Sans, "Source Sans 3");
            font-size: var(--Font-size-All-breakpoints-16, 16px);
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
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
    }

    button {
        background: none;
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

        &:hover i {
            color: #820000;
        }
    }
`
