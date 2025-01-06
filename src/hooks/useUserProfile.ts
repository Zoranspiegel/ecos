import { UserSchema } from '@/models/User';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export default function useUserProfile() {
  const { data, ...args } = useSWR('/api/users/profile', fetcher);

  return {
    ...args,
    data: UserSchema.safeParse(data).data
  };
}
