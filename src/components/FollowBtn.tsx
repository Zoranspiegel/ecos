'use client';

import { mutate } from "swr";

export default function FollowBtn({ userID, followed }: { userID: string; followed?: boolean }) {
  async function follow() {    
    const res = await fetch('/api/follows', {
      method: 'POST',
      body: JSON.stringify({ userID })
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/follows'));
    }
  }

  async function unfollow() {
    const res = await fetch('/api/follows', {
      method: 'DELETE',
      body: JSON.stringify({ userID })
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/follows'));
    }
  }

  return followed === false ? (
    <button className="flex items-center justify-center w-10 aspect-square bg-bluehaus text-xl" onClick={follow}>+</button>
  ) : (
    <button className="flex items-center justify-center w-10 aspect-square bg-redhaus text-xl" onClick={unfollow}>-</button>
  );
}
