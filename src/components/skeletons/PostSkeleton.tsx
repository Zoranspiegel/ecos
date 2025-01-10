export default function PostSkeleton({
  color
}: {
  color: 'bluehaus' | 'yellowhaus' | 'redhaus' | 'foreground';
}) {
  if (color === 'bluehaus')
    return (
      <div className="mr-2 mb-4 grid grid-cols-[20%,1fr] gap-2 animate-loading1">
        <div className="w-full aspect-square rounded-full bg-bluehaus"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 rounded-lg bg-bluehaus"></div>
          <div className="h-4 rounded-lg bg-bluehaus"></div>
          <div className="h-12 rounded-lg bg-bluehaus"></div>
        </div>
      </div>
    );
  if (color === 'redhaus')
    return (
      <div className="mr-2 mb-4 grid grid-cols-[20%,1fr] gap-2 animate-loading2">
        <div className="w-full aspect-square rounded-full bg-redhaus"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 rounded-lg bg-redhaus"></div>
          <div className="h-4 rounded-lg bg-redhaus"></div>
          <div className="h-12 rounded-lg bg-redhaus"></div>
        </div>
      </div>
    );
  if (color === 'yellowhaus')
    return (
      <div className="mr-2 mb-4 grid grid-cols-[20%,1fr] gap-2 animate-loading3">
        <div className="w-full aspect-square rounded-full bg-yellowhaus"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 rounded-lg bg-yellowhaus"></div>
          <div className="h-4 rounded-lg bg-yellowhaus"></div>
          <div className="h-12 rounded-lg bg-yellowhaus"></div>
        </div>
      </div>
    );
  return (
    <div className="mr-2 mb-4 grid grid-cols-[20%,1fr] gap-2 animate-loading4">
      <div className="w-full aspect-square rounded-full bg-foreground"></div>
      <div className="flex flex-col gap-2">
        <div className="h-6 rounded-lg bg-foreground"></div>
        <div className="h-4 rounded-lg bg-foreground"></div>
        <div className="h-12 rounded-lg bg-foreground"></div>
      </div>
    </div>
  );  
}
