import { UsersSchema } from '@/models/User';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export function useUsers({ page = 0, userSearch }: { page?: number, userSearch?: string }) {
  const { data, ...args } = useSWR(`/api/users?page=${page}${userSearch ? `&user_search=${userSearch}` : ''}`, fetcher);

  return {
    ...args,
    users: UsersSchema.safeParse(data).data
  }
}