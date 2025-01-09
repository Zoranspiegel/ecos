'use client';

import { useState, useEffect, useRef } from 'react';
import PostsContainer from '@/components/PostsContainer';

export default function FeedPage() {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const loadMoreRef = useRef(null);

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
    <PostsContainer key={i} page={i} setLoadMore={setLoadMore} />
  ));

  return (
    <div className="h-full p-2 flex flex-col gap-2 overflow-hidden">
      <h1>FEED_PAGE</h1>
      <div className="overflow-auto">
        {postPages}
        <div className="h-2" ref={loadMoreRef}></div>
      </div>
    </div>
  );
}
