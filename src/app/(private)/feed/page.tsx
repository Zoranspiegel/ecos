import PostsContainer from '@/components/PostsContainer';

export default function FeedPage() {
  return (
    <div className='h-full p-2 flex flex-col gap-2 overflow-hidden'>
      <h1>FEED_PAGE</h1>
      <PostsContainer />
    </div>
  );
}
