'use client';

import { useState } from 'react';
import { mutate } from 'swr';

export default function NewPost() {
  const [newPost, setNewPost] = useState<string>('');

  // HANDLE CHANGE NEW POST
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewPost(e.target.value);
  }

  // SUBMIT NEW POST
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fetchURL = '/api/posts';
    const res = await fetch(fetchURL, {
      method: 'POST',
      body: JSON.stringify({ content: newPost })
    });
    setNewPost('');

    if (res.ok) {
      const resJSON = await res.json();
      mutate((key: string) => key.startsWith(fetchURL), resJSON.data);
    }
  }

  return (
    <form
      className="h-full flex flex-col items-start gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        className="w-full h-full border-4 border-double border-foreground bg-background p-4 text-lg resize-none"
        onChange={handleChange}
        value={newPost}
        placeholder="Share your voice..."
      />
      <button className="w-[30%] border-4 border-double rounded-full p-2 text-2xl hover:bg-bluehaus hover:text-background hover:font-bold">Post</button>
    </form>
  );
}
