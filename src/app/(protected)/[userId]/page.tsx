"use client";
import { useState, useEffect } from "react";
import { api as trpc } from "@/trpc/react";

export default function Home() {
  const roomMutation = trpc.room.create.useMutation();
  const room = roomMutation.data;
  const { data: rooms, isPending, isError } = trpc.room.getAll.useQuery();

  // useEffect(()=>{

  // }, [rooms])

  const handleClick = () => {
    const result = roomMutation.mutate({
      name: "tria21",
      passcode: "xyz1232",
    });
  };

  return (
    <div className="h-screen w-screen">
      <div className="mx-auto w-[400px]">
        <h1 className="text-3xl font-bold">MusiQ Home</h1>
        <button
          className="rounded-sm border p-2 hover:cursor-pointer disabled:bg-black"
          onClick={handleClick}
          disabled={roomMutation.isPending}
        >
          Create room
        </button>
        {roomMutation.isPending && <p>...Loading</p>}
        {roomMutation.isError && <p>Cannot create room</p>}
        {rooms && rooms.length === 0 && <p>No rooms found.</p>}
        {rooms && rooms.length > 0 && (
          <ul className="space-y-2">
            {rooms.map((room) => (
              <li key={room.id} className="rounded border p-2">
                <span className="font-bold">{room.name}</span>
                <span className="ml-2 text-gray-500">({room.passcode})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
