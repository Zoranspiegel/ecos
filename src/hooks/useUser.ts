import { UserSchema } from "@/models/User";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useUser(username?: string) {
  const { data, ...args } = useSWR(`/api/users/${username ? username : 'profile'}`, fetcher);

  return {
    user: UserSchema.safeParse(data).data,
    ...args
  }
}
