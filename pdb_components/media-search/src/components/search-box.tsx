import {
  useSearchBox
} from "react-instantsearch";
import {useId, useRef} from "preact/compat";
import {SearchForm, SearchInput} from "../styled-components";

const SearchBox = ({federatedSearch}: { federatedSearch?: boolean }) => {
  const {query, refine} = useSearchBox();
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null);
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
            defaultValue={query}
          />
          <div class="search-buttons">
            <button
              type="reset"
              hidden={query.length === 0}
            >
              <i class="fa-solid fa-close"></i>
              <span className="visually-hidden">Clear search</span>
            </button>
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span className="visually-hidden">Submit search</span>
            </button>
            <span className="divider"/>
          </div>
        </SearchInput>

      </div>
    </SearchForm>
  );
}

export default SearchBox;
