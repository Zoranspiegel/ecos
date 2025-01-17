'use client';

import { useRef } from 'react';
import { debounce } from 'lodash';

export default function SearchPosts({
  setContent
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // DEBOUNCED SET SEARCH
  const debouncedSetContent = debounce((search) => setContent(search), 500);

  // HANDLE INPUT CHANGE
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSetContent(e.target.value);
  }

  // HANDLE CLEAR SEARCH
  function handleClearSearch() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setContent('');
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
