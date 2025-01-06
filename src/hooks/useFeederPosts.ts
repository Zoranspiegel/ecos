import { PostsSchema } from '@/models/Post';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export default function useFeederPosts(page: number) {
  const { data, ...args } = useSWR(`/api/posts/feed?page=${page}`, fetcher);

  return {
    ...args,
    data: PostsSchema.safeParse(data).data
  }
}
