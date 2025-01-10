'use client';

import { useRef } from 'react';

export default function SearchUsers() {
  const inputRef = useRef<HTMLInputElement>(null);

  // HANDLE CLEAR SEARCH
  function handleClearSearch() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <form className="relative w-full h-full">
      <input
        className="searchInput"
        type="text"
        placeholder="Username..."
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
