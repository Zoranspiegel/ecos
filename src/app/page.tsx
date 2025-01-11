import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-full max-w-xs border-4 border-double border-foreground bg-background p-6 flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-bold">ECOS</h1>
        <Link
          className="w-full border-4 border-double border-foreground p-2 text-center hover:border-background hover:bg-foreground hover:text-background hover:font-bold"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="w-full border-4 border-double border-foreground p-2 text-center hover:border-background hover:bg-foreground hover:text-background hover:font-bold"
          href="/signup"
        >
          Signup
        </Link>
      </div>
    </main>
  );
}
