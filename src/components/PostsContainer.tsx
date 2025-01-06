'use client';

import useFeederPosts from '@/hooks/useFeederPosts';
import Post from './Post';

export default function PostsContainer() {
  const { data, isLoading, error } = useFeederPosts(0);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return null;

  return (
    <div className="h-full overflow-auto">
      {data?.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
}
