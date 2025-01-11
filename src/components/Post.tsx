import type { Post } from '@/models/Post';
import Image from 'next/image';

export default function Post({ post }: { post: Post }) {
  return (
    <div key={post.id} className="mb-4 mr-2 grid grid-cols-[20%,1fr] gap-4">
      <div className="relative w-full aspect-square border-4 border-double border-foreground rounded-full overflow-hidden">
        {post.avatar ? (
          <Image
            src={post.avatar}
            alt={`${post.username}'s profile image`}
            fill
          />
        ) : (
          <div className="h-full flex justify-center items-center uppercase text-5xl">
            {post.username[0]}
          </div>
        )}
      </div>
      <div className='flex flex-col'>
        <h1 className={`text-xl font-bold ${post.is_admin ? 'text-redhaus' : ''}`}>{post.username}</h1>
        <span className='mb-2 text-xs opacity-50'>{`Created ${new Date(post.created_at).toLocaleString(
          'en-us',
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
        )}`}</span>
        <p>{post.content}</p>
      </div>
    </div>
  );
}