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
            max-width: 440px;
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
                // height: 180px;
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
                    height: 232px;
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
                display: flex;
                padding: 2px 7px 3px 7px;
                justify-content: center;
                align-items: center;
                gap: 4px;
                border-radius: 2px;
                background: var(--Primary-SU-Cool-Grey, #53565A);
                color: #FFF;
                font-size: 13px;
                align-self: flex-start;
                margin-top: auto;
            }
        }

        @media (min-width: 1530px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 991px) {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 24px;

            .media-search__card {
                width: 100%;
            }

            .media-search__card-image {
                height: 180px;

                img {
                    height: 100%;
                }
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

    /* Page number buttons â€” default (not current) */
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

    @media (max-width: 440px) {
        gap: 5px;

        && button.page-number {
            font-size: 20.25px;
            width: 30px;
        }

        && button:not(.page-number) {
            padding: 0 3px;
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

    @media (max-width: 360px) {
        padding: 0 6px;
    }
`
export const DropDownListPortalStyle = styled.div`
    .dropdown-positioner {
        z-index: 100;
        /* Base UI Positioner sets inline transform; offset via margins. */
        margin-top: -10px;
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
        padding: 0;

        &:focus, &:focus-visible {
            outline: none !important;
        }
    }

    .dropdown-item {
        -webkit-appearance: none;
        appearance: none;
        border: 0;
        background: transparent;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        color: inherit;
        text-align: left;
        line-height: 1.3;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1px var(--spacing-ms-1, 27px);
        cursor: pointer;

        &:hover {
            background: #F4F4F4;
            text-decoration: none;
        }

        &:focus, &:focus-visible {
            outline: 2px solid #C0C0BF;
            text-decoration: none;
            box-shadow: none;
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
  .select-dropdown-container {
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
        position: relative;
        top: 50px;

        &:focus, &:focus-visible {
            outline: none !important;
        }

    .label {

    }

    .trigger {
        border: 1px solid rgb(192, 192, 191);
        padding: 0px 22px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 40px;
        white-space: nowrap;
        display: flex;  
        align-items: center;
        gap: 5px;
        color: var(--Primary-Black, #2E2D29);
        background: none;
        font-size: 16px;

        span.icon-span {
            align-items: center;
            display: flex;
        }
    }

    .portal {
        // Base UI Select positioner is marked with data-open when shown.
        // Force popup 20px lower than the default 10px offset.
        > div[data-open] {
            margin-top: 30px !important;
        }
    }

  }
`

export const DropDownPortalStyle = styled.div`
  background: white;
  max-height: 300px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);

  .popup {
  
    .list {
    
        .item {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            margin: 2px;
            padding-left: 9px;

            &[data-higlighted], &:hover, &:focus {
                text-decoration: underline;

                i {
                    color: var(--Primary-Red, #B1040E);
                }
            }

            i.fa-square-check {
                color: var(--Primary-Red, #B1040E);
            }
        }
    }  
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
            gap: 12px;
        }

        @media (max-width: 580px) {
            flex-wrap: wrap;
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

        @media (max-width: 580px) {
            width: 100%;
        }
    }

    .active-filters-bar {
        display: none;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        padding-left: 0;

        @media (min-width: 991px) {
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
        font-size: 16px !important;
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
        font-size: 16px !important;
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

        @media (max-width: 360px) {
            gap: 10px;
        }
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

        &:focus-visible {
            outline: none;
        }

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

            @media (max-width: 360px) {
                padding: 0 12px;
            }

            &:focus,
            &:focus-visible,
            &:active,
            &[aria-expanded="true"] {
                outline: none !important;
            }

            &:hover, &:focus {
                text-decoration: none;
            }

            &:hover .all-filters-label {
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
  background: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateX(${({$open}) => $open ? '0' : '100%'});
  transition: transform 0.3s ease;

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .fa-square-check {
    display: none;
  }

  i.fa-regular.fa-square:hover {
    color: #B1040E;
    }

  input[type="checkbox"] {
    &:hover, &:focus {
      & ~ span {
        text-decoration: underline;
      }

    }

    &:checked {
      & ~ .fa-square {
        display: none;
      }
      & ~ .fa-square-check {
        display: block;
      }

    }
  }

  button.tray-section-toggle {
    color: black;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  button, [role="checkbox"], input {
    &:focus {
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
    border-bottom: 1px solid #d5d5d4;

    .tray-title {
      font-size: 18px;
      font-weight: 700;
      color: #2e2d29;
    }

    .tray-close {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
      color: #2e2d29;
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
    border-bottom: 1px solid #d5d5d4;
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

      &:focus {
        text-decoration: underline;
      }
        
        &[expanded="true"] {
            :before {
                transform: rotate(180deg);
                transition: transform 0.25s ease;
            }
        }   
    }

    legend {
        width: 100%;
    }
    label {
        margin-top: 10px;
    }

    .block {
        padding-bottom: 30px;

        i.fa-square-check {
            color: var(--Primary-Red, #B1040E);
        }
    }

    // :after {
    //     content: '.';
    //     // color: transparent;
    //     display: inline-block;
    //     position: absolute;
    //     right: 30px;
    //     top: -36px;
    //     background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M1 1L8 8L0.999999 15" stroke="%236D6C69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    //     background-repeat: no-repeat;
    //     width: 10px;
    //     height: 25px;
    //     transform: rotate(90deg);
    // }

    

    .tray-section-title {
      font-size: 18px !important;
      font-weight: 400 !important;
      color: #2e2d29;
      text-transform: none;
      letter-spacing: normal;
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
      font-size: 16px !important;
      color: #2e2d29;
      background: none;
      border: none;
      padding: 5px 0;
      width: 100%;
      text-align: left;

      &:hover {
        background: #f4f4f4;
        text-decoration: none;
      }

      &:hover .tray-checkbox {
        border-color: #b1040e;
      }

      &:focus {
        outline: rgb(192, 192, 191) solid 2px;
        text-decoration: none;
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
      border: 2.5px solid #c0c0bf;
      background: #fff;
    }

    .tray-option-btn--checked .tray-checkbox {
      background: #b1040e;
      border-color: #b1040e;
    }

    .tray-option-empty {
      font-size: 14px;
      color: #8f8c89;
      padding-bottom: 8px;
    }
  }

  .tray-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 27px;
    border-top: 1px solid #d5d5d4;

    .tray-clear {
      display: flex;
      padding: 10px 15px;
      align-items: center;
      border-radius: 3px;
      border: 1px solid var(--primary-black-20, #d5d5d4);
      background: var(--Primary-White, #fff);
      font-size: 16px;
      color: #53565a;
      cursor: pointer;

      &.tray-clear--active {
        border: 1px solid var(--Accent-Lagunita-Light, #009ab4);
        background: var(--Primary-White, #fff);
        color: var(--Accent-Lagunita, #007c92);
      }
    }

    .tray-view-results {
      display: flex;
      padding: 10px 13px;
      align-items: center;
      border-radius: 3px;
      border: 1px solid var(--Accent-Lagunita-Light, #009ab4);
      background: var(--Accent-Lagunita, #007c92);
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.10);
      color: #fff;
      font-size: 16px;
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
        padding: 0 62px 0 26px;
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
            box-shadow: none !important;
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

        [type=submit] {
            padding-right: 7px;
        }
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
