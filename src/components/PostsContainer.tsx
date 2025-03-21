'use client';

import { useEffect } from 'react';
import usePosts from '@/hooks/usePosts';
import Post from './Post';
import PostSkeletons from '@/components/skeletons/PostSkeletons';

export default function PostsContainer({
  page,
  setLoadMore,
  content,
  userID,
  personal,
  setToTop
}: {
  page: number;
  setLoadMore: React.Dispatch<React.SetStateAction<boolean>>;
  content?: string;
  userID?: string;
  personal?: boolean
  setToTop?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { posts, isLoading, error } = usePosts({ page, content, userID, personal });

  useEffect(() => {
    if (posts?.length === 0) setLoadMore(false);
  }, [posts, setLoadMore]);

  if (isLoading) return <PostSkeletons />;

  if (error) return null;

  return (
    <div>      
      {posts?.map((post) => (
        <Post key={post.id} post={post} personal={personal} setToTop={setToTop} />
      ))}
    </div>
  );
}
