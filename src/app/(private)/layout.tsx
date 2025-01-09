import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-full max-w-sm m-auto py-2 grid grid-rows-[7%,7%,1fr,2%] gap-2'>
      <Header />
      <Navbar />
      <main className='border-4 border-double border-foreground bg-background overflow-hidden'>
        {children}
      </main>
      <Footer />
    </div>
  );
}