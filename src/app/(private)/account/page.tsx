'use client';

import useUser from "@/hooks/useUser";

export default function AccountPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>LOADING...</div>;
  if (error || !user) return;

  return (
    <div>{user.username}</div>
  );
}