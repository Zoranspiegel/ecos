import PostSkeleton from './PostSkeleton';

export default function PostsSkeleton() {
  const skeletonCards = Array.from({ length: 6 }, (_, i) => <PostSkeleton key={i} />);

  return <div>{skeletonCards}</div>;
}
