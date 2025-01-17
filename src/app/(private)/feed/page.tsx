'use client';

import { useState, useEffect, useRef } from 'react';
import PostsContainer from '@/components/PostsContainer';
import SearchUsers from '@/components/SearchUsers';
import SearchPosts from '@/components/SearchPosts';

export default function FeedPage() {
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // TOGGLE FEED & SEARCH LOAD_MORE
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
    setLoadMore(true);
  }, [content]);

  // INFINITE SCROLL INTERSECTION OBSERVER
  useEffect(() => {
    if (!loadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevState) => prevState + 1);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [loadMore]);

  // POST PAGES
  const postPages = Array.from({ length: page }, (_, i) => (
    <PostsContainer key={i} page={i} setLoadMore={setLoadMore} content={content} userID={userID} />
  ));

  return (
    <div className="h-full p-2 grid grid-rows-[7%,1fr] gap-4 overflow-hidden">
      <div className="z-10 flex items-center justify-evenly gap-2">
        <SearchUsers setUserID={setUserID} />
        <SearchPosts setContent={setContent} />
      </div>
      <div className="overflow-auto scroll-smooth" ref={scrollAreaRef} >
        {postPages}
        <div className="h-2" ref={loadMoreRef}></div>
      </div>
    </div>
  );
}
