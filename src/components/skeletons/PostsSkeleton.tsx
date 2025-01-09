import PostSkeleton from './PostSkeleton';

export default function PostsSkeleton() {
  const skeletonCards = Array.from({ length: 6 }, (_, i) => {
    switch (i % 4) {
      case 0:
        return <PostSkeleton key={i} color="bluehaus" />;
      case 1:
        return <PostSkeleton key={i} color="yellowhaus" />;
      case 2:
        return <PostSkeleton key={i} color="redhaus" />;
      case 3:
        return <PostSkeleton key={i} color="foreground" />;
    }
  });

  return <div>{skeletonCards}</div>;
}
