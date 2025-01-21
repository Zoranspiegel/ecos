import { PostsSchema } from '@/models/Post';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

function getUrl({ page, content, userID, personal }: { page: number, personal?: boolean,  content?: string, userID?: string }) {
  if (personal) return `/api/posts/user/personal?page=${page}`;
  if (userID) return `/api/posts/user/${userID}?page=${page}`;
  if (content) return `/api/posts/search?content=${content}&page=${page}`;
  return `/api/posts/feed?page=${page}`;
}

export default function usePosts({ page, personal, content, userID}: { page: number, personal?: boolean, content?: string, userID?: string }) {
  const url = getUrl({ page, personal, content, userID });
  const { data, ...args } = useSWR(url, fetcher);

  return {
    ...args,
    posts: PostsSchema.safeParse(data).data
  }
}
