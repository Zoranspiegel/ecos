import { PostsSchema } from '@/models/Post';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

function getUrl(key: string, page: number, content?: string, username?: number) {
  if (username) return `${key}?username=${username}&page=${page}`;
  if (content) return `${key}/search?content=${content}&page=${page}`;
  return `${key}/feed?page=${page}`;
}

export default function usePosts(page: number, content?: string, username?: number) {
  const KEY = '/api/posts';
  const url = getUrl(KEY, page, content, username);
  const { data, ...args } = useSWR(url, fetcher);

  return {
    ...args,
    data: PostsSchema.safeParse(data).data
  }
}
