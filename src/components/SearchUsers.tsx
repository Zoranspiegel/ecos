'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import UsersSearchContainer from './UsersSearchContainer';

export default function SearchUsers({
  setUserID
}: {
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userSearch, setUserSearch] = useState<string>('');
  const [usersVisibility, setUsersVisibility] = useState<boolean>(false);

  // HANDLE USERS SEARCH VISIBILITY
  useEffect(() => {
    function handleUsersVisibility(e: MouseEvent) {
      if (inputRef.current) {
        if (inputRef.current.contains(e.target as Node)) {
          setUsersVisibility(true);
        } else {
          setUsersVisibility(false);
        }
      }
    }
    addEventListener('click', handleUsersVisibility);

    return () => {
      removeEventListener('click', handleUsersVisibility);
    };
  }, [userSearch]);

  // HANDLE SEARCH
  const debouncedSetSearch = debounce((search) => setUserSearch(search), 500);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedSetSearch(e.target.value);
  }

  // HANDLE CLEAR SEARCH
  function handleClearSearch() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setUserSearch('');
    setUserID('');
  }

  return (
    <div className="relative w-full h-full">
      <form className="relative w-full h-full">
        <input
          className="searchInput"
          type="text"
          placeholder="Username..."
          ref={inputRef}
          onChange={handleChange}
        />
        <button
          className="clearSearchBtn"
          onClick={handleClearSearch}
          type="button"
        >
          X
        </button>
      </form>
      {usersVisibility && (
        <UsersSearchContainer userSearch={userSearch} setUserID={setUserID} />
      )}
    </div>
  );
}
