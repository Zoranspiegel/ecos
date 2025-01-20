import { UserSchema } from '@/models/User';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export default function useLoggedInUser() {
  const { data, ...args } = useSWR('/api/users/profile', fetcher);

  return {
    ...args,
    loggedInUser: UserSchema.safeParse(data).data
  };
}
