import FollowsSkeleton from "./FollowsSkeleton";

export default function FollowsSkeletons() {
  const skeletonCards = Array.from({ length: 4 }, (_, i) => {
    switch (i % 4) {
      case 0:
        return <FollowsSkeleton key={i} color="bluehaus" />;
      case 1:
        return <FollowsSkeleton key={i} color="yellowhaus" />;
      case 2:
        return <FollowsSkeleton key={i} color="redhaus" />;
      case 3:
        return <FollowsSkeleton key={i} color="foreground" />;
    }
  });

  return <div className="flex flex-col gap-2 mb-2">{skeletonCards}</div>;
}
