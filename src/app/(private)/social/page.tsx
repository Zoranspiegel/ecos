"use client";

import FollowsContainer from "@/components/FollowsContainer";
import FollowsToggleBtn from "@/components/FollowsToggleBtn";
import { useState } from "react";

export default function FollowersPage() {
  const [followsType, setFollowsType] = useState<followsT>('following');

  return (
    <div className="h-full p-2 grid grid-rows-[5%,1fr] gap-4">
      <FollowsToggleBtn type={followsType} setType={setFollowsType} />
      <FollowsContainer type={followsType} page={0}/>
    </div>
  );
}
