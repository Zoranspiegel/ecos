'use client';

import { useEffect, useRef, useState } from 'react';
import PostsContainer from '@/components/PostsContainer';
import NewPost from '@/components/NewPost';
import useLoggedInUser from '@/hooks/useLoggedInUser';

export default function PostPage() {
  const { loggedInUser } = useLoggedInUser();
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // INFINITE SCROLL INTERSECTION OBSERVER
  useEffect(() => {
    if (!loadMore) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevState) => prevState + 1);
      }
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }
    
    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    }
  }, [loadMore]);

  if (!loggedInUser) return null;

  // POST PAGES
  const postPages = Array.from({ length: page }, (_, i) => (
    <PostsContainer key={i} page={i} setLoadMore={setLoadMore} content='' userID={loggedInUser?.id} />
  ));

  return (
    <div className='h-full p-2 grid grid-rows-[35%,1fr] gap-4'>
      <NewPost />
      <div className='h-full overflow-auto' ref={scrollAreaRef} >
        {postPages}        
        <div className='h-2' ref={loadMoreRef}></div>
      </div>
    </div>
  );
}