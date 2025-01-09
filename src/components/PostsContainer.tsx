'use client';

import useFeederPosts from '@/hooks/useFeederPosts';
import Post from './Post';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import PostsSkeleton from '@/skeletons/PostsSkeleton';

export default function PostsContainer({
  page,
  setLoadMore
}: {
  page: number;
  setLoadMore: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isLoading, error } = useFeederPosts(page);

  useEffect(() => {
    if (data?.length === 0) setLoadMore(false);
  }, [data, setLoadMore]);

  if (isLoading) return <PostsSkeleton />

  if (error) return null;

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
