'use client';

import { useEffect, useRef, useState } from 'react';
import { mutate } from 'swr';

export default function EditPostBtn({
  postID,
  setEditing
}: {
  postID: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(false);
  const editPanelRef = useRef<HTMLDivElement>(null);

  // HANDLE PANEL VISIBILITY
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        editPanelRef.current &&
        editPanelRef.current.contains(e.target as Node)
      ) {
        setOptionsVisibility(true);
      } else {
        setDeleteVisibility(false);
        setOptionsVisibility(false);
      }
    }

    addEventListener('click', handleClickOutside);

    return () => {
      removeEventListener('click', handleClickOutside);
    };
  }, []);

  // HANDLE EDIT
  function handleEdit() {
    setOptionsVisibility(false);
    setEditing(true);
  }

  // HANDLE POST DELETE
  async function handlePostDelete() {
    const res = await fetch(`/api/posts/${postID}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/posts'));
    }

    setDeleteVisibility(false);
  }

  return (
    <div className="absolute top-0 right-0" ref={editPanelRef}>
      <div className="w-3 cursor-pointer">
        <DotsIcon />
      </div>
      {optionsVisibility && (
        <div className="absolute top-0 right-0 w-8 h-16 border-4 border-double border-foreground bg-bluehaus flex flex-col items-center justify-evenly box-content">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={handleEdit}
          >
            E
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setDeleteVisibility(true)}
          >
            D
          </div>
          {deleteVisibility && (
            <div className="absolute right-full -top-1 -bottom-1 w-40 border-4 border-double border-foreground bg-redhaus flex flex-col items-center justify-evenly">
              <div>CONFIRM?</div>
              <div className="w-full flex items-center justify-evenly">
                <div className="cursor-pointer" onClick={handlePostDelete}>
                  Y
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setDeleteVisibility(false)}
                >
                  N
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 7 14">
      <circle cx="3.5" cy="3.5" r="1" className="fill-foreground" />
      <circle cx="3.5" cy="7" r="1" className="fill-foreground" />
      <circle cx="3.5" cy="10.5" r="1" className="fill-foreground" />
    </svg>
  );
}
