import { PostsSchema } from '@/models/Post';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

function getUrl({ page, content, userID }: { page: number, content?: string, userID?: string }) {
  if (userID) return `/api/posts/user/${userID}?page=${page}`;
  if (content) return `/api/posts/search?content=${content}&page=${page}`;
  return `/api/posts/feed?page=${page}`;
}

export default function usePosts({ page, content, userID}: { page: number, content?: string, userID?: string }) {
  const url = getUrl({ page, content, userID });
  const { data, ...args } = useSWR(url, fetcher);

  return {
    ...args,
    posts: PostsSchema.safeParse(data).data
  }
}
