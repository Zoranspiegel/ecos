'use client';

import { useEffect } from 'react';
import usePosts from '@/hooks/usePosts';
import Post from './Post';
import PostsSkeleton from '@/components/skeletons/PostsSkeleton';

export default function PostsContainer({
  page,
  setLoadMore,
  content,
  userID
}: {
  page: number;
  setLoadMore: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  userID: string;
}) {
  const { posts, isLoading, error } = usePosts({ page, content, userID });

  useEffect(() => {
    if (posts?.length === 0) setLoadMore(false);
  }, [posts, setLoadMore]);

  if (isLoading) return <PostsSkeleton />;

  if (error) return null;

  return (
    <div>      
      {posts?.map((post) => (
        <Post key={post.id} post={post} personal={userID === post.user_id} />
      ))}
    </div>
  );
}
