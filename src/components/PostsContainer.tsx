'use client';

import usePosts from '@/hooks/usePosts';
import Post from './Post';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import PostsSkeleton from '@/components/skeletons/PostsSkeleton';

export default function PostsContainer({
  page,
  setLoadMore,
  content
}: {
  page: number;
  setLoadMore: Dispatch<SetStateAction<boolean>>;
  content: string;
}) {
  const { data, isLoading, error } = usePosts(page, content);

  useEffect(() => {
    if (data?.length === 0) setLoadMore(false);
  }, [data, setLoadMore]);

  if (!isLoading) return <PostsSkeleton />

  if (error) return null;

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
