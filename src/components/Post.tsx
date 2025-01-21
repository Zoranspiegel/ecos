'use client';

import type { Post } from '@/models/Post';
import { useEffect, useRef, useState } from 'react';
import { mutate } from 'swr';
import Image from 'next/image';
import EditPostBtn from './EditPostBtn';

export default function Post({
  post,
  personal,
  setToTop
}: {
  post: Post;
  personal?: boolean;
  setToTop?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(post.content);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // EDIT TEXTAREA FOCUS
  useEffect(() => {
    if (editTextareaRef.current) {
      editTextareaRef.current.focus();
    }
  }, [editing]);

  // EDIT TEXTAREA CHANGE
  function handleEditTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditContent(e.target.value);
  }

  // HANDLE EDIT SUBMIT
  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: editContent })
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/posts'));
    }

    if (setToTop) {
      setToTop(true);
    }
    setEditing(false);
  }

  return (
    <div
      key={post.id}
      className="relative mb-4 mr-2 grid grid-cols-[20%,1fr] gap-4"
    >
      <div className="relative w-full aspect-square border-4 border-double border-foreground rounded-full overflow-hidden">
        {post.avatar ? (
          <Image
            src={post.avatar}
            alt={`${post.username}'s profile image`}
            fill
          />
        ) : (
          <div className="h-full flex justify-center items-center uppercase text-5xl">
            {post.username[0]}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h1
          className={`text-xl font-bold ${post.is_admin ? 'text-redhaus' : ''}`}
        >
          {post.username}
        </h1>
        <span className="mb-2 text-xs opacity-50">{`${
          post.created_at === post.updated_at ? 'Created' : 'Edited'
        } ${new Date(
          post.created_at === post.updated_at
            ? post.created_at
            : post.updated_at
        ).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })}`}</span>
        {editing ? (
          <form className="relative" onSubmit={handleEditSubmit}>
            <textarea
              className="w-full h-32 border-4 border-double border-foreground bg-background px-2 py-1 outline-none resize-none"
              value={editContent}
              onChange={handleEditTextareaChange}
              ref={editTextareaRef}
            />
            <button className="absolute bottom-2 right-0 border-4 border-double border-foreground bg-background px-1 text-xs hover:bg-foreground hover:text-background hover:font-bold">
              O
            </button>
          </form>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      {personal && <EditPostBtn postID={post.id} setEditing={setEditing} />}
    </div>
  );
}
