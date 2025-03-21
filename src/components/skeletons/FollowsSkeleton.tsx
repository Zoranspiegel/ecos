export default function FollowsSkeleton({
  color,
}: {
  color: "redhaus" | "yellowhaus" | "bluehaus" | "foreground";
}) {
  if (color === "bluehaus")
    return (
      <div className="w-full flex items-center justify-between pr-2 animate-loading1">
        <div className="flex w-full items-center gap-4">
          <div className="w-[20%] aspect-square rounded-full bg-bluehaus"></div>
          <div className="h-10 w-full bg-bluehaus"></div>
        </div>
      </div>
    );
  if (color === "yellowhaus")
    return (
      <div className="w-full flex items-center justify-between pr-2 animate-loading2">
        <div className="flex w-full items-center gap-4">
          <div className="w-[20%] aspect-square rounded-full bg-yellowhaus"></div>
          <div className="h-10 w-full bg-yellowhaus"></div>
        </div>
      </div>
    );
  if (color === "redhaus")
    return (
      <div className="w-full flex items-center justify-between pr-2 animate-loading3">
        <div className="flex w-full items-center gap-4">
          <div className="w-[20%] aspect-square rounded-full bg-redhaus"></div>
          <div className="h-10 w-full bg-redhaus"></div>
        </div>
      </div>
    );
  if (color === "foreground")
    return (
      <div className="w-full flex items-center justify-between pr-2 animate-loading4">
        <div className="flex w-full items-center gap-4">
          <div className="w-[20%] aspect-square rounded-full bg-foreground"></div>
          <div className="h-10 w-full bg-foreground"></div>
        </div>
      </div>
    );
}
