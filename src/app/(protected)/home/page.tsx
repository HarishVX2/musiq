"use client";
import { useState } from "react";
import { api as trpc } from "@/trpc/react";

export default function Home() {
  const mutation = trpc.room.create.useMutation();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      const result = mutation.mutate({ name: "my_room1", passcode: "xyz123" });
      setIsDisabled(false);
    }, 5000);
  };
  return (
    <div className="h-screen w-screen">
      <div className="mx-auto w-[400px]">
        <h1 className="text-3xl font-bold">MusiQ Home</h1>
        <button
          className="rounded-sm border p-2 hover:cursor-pointer disabled:bg-black"
          onClick={handleClick}
          disabled={isDisabled}
        >
          Create room
        </button>
      </div>
    </div>
  );
}
