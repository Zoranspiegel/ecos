"use client";

import FollowsContainer from "@/components/FollowsContainer";
import FollowsToggleBtn from "@/components/FollowsToggleBtn";
import { useEffect, useRef, useState } from "react";

export default function FollowersPage() {
  const [followsType, setFollowsType] = useState<followsT>("following");
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const loadMoreRef = useRef(null);

  // PAGE & LOAD MORE RESET
  useEffect(() => {
    setLoadMore(true);
    setPage(1);
  }, [followsType]);

  // INFINITE SCROLL INTERSECTION OBSERVER
  useEffect(() => {
    if (!loadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
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

  // FOLLOW PAGES
  const pages = Array.from({ length: page }, (_, i) => (
    <FollowsContainer
      key={i}
      type={followsType}
      page={i}
      setLoadMore={setLoadMore}
    />
  ));

  return (
    <div className="h-full p-2 grid grid-rows-[5%,1fr] gap-4">
      <FollowsToggleBtn type={followsType} setType={setFollowsType} />
      <div className="overflow-auto">
        {pages}
        <div ref={loadMoreRef} className="h-2"></div>
      </div>
    </div>
  );
}
