'use client';

import { useRef } from 'react';
import { debounce } from 'lodash';

export default function SearchPosts({
  setSearch
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // DEBOUNCED SET SEARCH
  const debouncedSetSearch = debounce((search) => setSearch(search), 500);

  // HANDLE INPUT CHANGE
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSetSearch(e.target.value);
  }

  // HANDLE CLEAR SEARCH
  function handleClearSearch() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    debouncedSetSearch('');
  }

  return (
    <form className="relative w-full h-full">
      <input
        className="searchInput"
        type="text"
        placeholder="Content..."
        onChange={handleChange}
        ref={inputRef}
      />
      <button
        className="clearSearchBtn"
        onClick={handleClearSearch}
        type="button"
      >
        X
      </button>
    </form>
  );
}
