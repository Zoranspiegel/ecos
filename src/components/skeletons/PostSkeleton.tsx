export default function PostSkeleton() {
  return (
    <div className="mb-4 mr-2 grid grid-cols-[20%,1fr] gap-4 animate-pulse duration-100">
      <div className="relative w-full aspect-square border-4 border-double border-yellowhaus rounded-full opacity-50"></div>
      <div className="flex flex-col gap-1">
        <div className="h-6 rounded-lg bg-yellowhaus opacity-25"></div>
        <div className="h-4 rounded-lg bg-yellowhaus opacity-10"></div>
        <div className="h-12 rounded-lg bg-yellowhaus opacity-25"></div>
      </div>
    </div>
  );
}
