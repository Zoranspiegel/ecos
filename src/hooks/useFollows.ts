'use client';

import useSWR from "swr";
import { fetcher } from '@/utils/fetcher';
import { FollowsUsersSchema } from "@/models/Follows";

export default function useFollows({ type, page, userID }: {
  type: followsT;
  page: number;
  userID?: string;
}) {
  const { data, ...args } = useSWR(`/api/follows/${type}${userID ? `/${userID}` : ''}?page=${page}`, fetcher);

  const followsUsers = FollowsUsersSchema.safeParse(data).data;

  return { followsUsers, ...args };
}
