'use client';

import React from "react";
import useUser from "@/hooks/useUser";

export default function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = React.use(params);
  const { user, isLoading, error } = useUser(username);

  if (isLoading) return <div>LOADING...</div>
  if (error || !user) return;

  return <div>{user.username}</div>;
}
