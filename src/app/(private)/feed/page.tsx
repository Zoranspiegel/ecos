'use client';

import { useState, useEffect, useRef } from 'react';
import PostsContainer from '@/components/PostsContainer';

export default function FeedPage() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  // INFINITE SCROLL INTERSECTION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevState) => prevState + 1);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore]);

  // POST PAGES
  const postPages = Array.from({ length: page }, (_, i) => (
    <PostsContainer key={i} page={i} setHasMore={setHasMore} />
  ));

  return (
    <div className="h-full p-2 flex flex-col gap-2 overflow-hidden">
      <h1>FEED_PAGE</h1>
      <div className="overflow-auto">
        {postPages}
        <div className="h-2" ref={observerRef}></div>
      </div>
    </div>
  );
}
