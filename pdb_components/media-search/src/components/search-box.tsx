import {
  useSearchBox
} from "react-instantsearch";
import {useId, useRef, useState} from "preact/compat";
import {SearchForm, SearchInput} from "../styled-components";

const SearchBox = ({federatedSearch}: { federatedSearch?: boolean }) => {
  const {query, refine} = useSearchBox();
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [inputValue, setInputValue] = useState(query);

  return (
    <SearchForm
      className={federatedSearch ? "federated-search" : ""}
      action=""
      role="search"
      noValidate
      onSubmit={(e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        refine(inputRef.current?.value || "");
      }}
      onReset={(e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        refine('');
        setInputValue('');

        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.focus();
        }
      }}
    >
      <div className="search-input">
        <SearchInput>
          <label htmlFor={id} className="visually-hidden">
            Keywords Search
          </label>
          <input
            id={id}
            ref={inputRef}
            autoComplete="on"
            autoCorrect="on"
            autoCapitalize="off"
            maxLength={128}
            type="search"
            placeholder="Search"
            defaultValue={query}
            onInput={(e: Event) => setInputValue((e.target as HTMLInputElement).value)}
            onMouseDown={() => { mouseDownRef.current = true; }}
            onFocus={() => {
              if (!mouseDownRef.current && inputRef.current) {
                inputRef.current.setAttribute('autocomplete', 'on');
              }
              mouseDownRef.current = false;
            }}
            onBlur={() => {
              if (inputRef.current) {
                inputRef.current.setAttribute('autocomplete', 'off');
              }
            }}
          />
          <div class="search-buttons">
            <button
              type="reset"
              hidden={inputValue.length === 0}
              aria-label="Clear search"
            >
              <svg width="9.6" height="11.2" viewBox="0 0 9.6 11.2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="clear-icon">
                <path d="M0.8 1L8.8 10.2M8.8 1L0.8 10.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </button>
            <span className="divider" aria-hidden="true"/>
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <span className="visually-hidden">Submit search</span>
            </button>
          </div>
        </SearchInput>

      </div>
    </SearchForm>
  );
}

export default SearchBox;
