"use client";
import { useState, useEffect, type FormEvent } from "react";
import { Plus, Music, UserPlus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api as trpc } from "@/trpc/react";
import {
  CreateRoomModal,
  JoinRoom,
  RoomToastContainer,
  Search,
  showSuccessToast,
  UserRooms,
} from "@/app/_components";
import { signOut } from "next-auth/react";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [createForm, setCreateForm] = useState({
    name: "",
    passcode: "",
  });

  //queries
  const {
    data: rooms,
    isPending,
    isError,
  } = trpc.room.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
  const { data: userRooms, refetch: refetchUserRooms } =
    trpc.room.getAll?.useQuery(undefined, { refetchOnWindowFocus: false }) || {
      data: [],
      refetch: () => {},
    };

  //mutation
  const roomMutation = trpc.room.create.useMutation();
  const room = roomMutation.data;
  const createRoomMutation = trpc.room.create.useMutation({
    onSuccess: (data) => {
      showSuccessToast("Success! Room created successfully.");

      setShowCreateForm(false);
      setCreateForm({
        name: "",
        passcode: "",
      });
      refetchUserRooms();
    },
  });

  const joinRoomMutation = trpc.room.join.useMutation({
    onSuccess: (data) => {
      setJoinRoomId("");
      setJoinPassword("");
    },
  });

  const handleJoinRoom = (roomId: string, isPrivate: boolean = false) => {
    if (isPrivate && !joinPassword) {
      setJoinRoomId(roomId);
      return;
    }

    joinRoomMutation.mutate({
      roomId,
      passcode: joinPassword,
    });
  };

  const handleCreateRoom = (e: FormEvent) => {
    createRoomMutation.mutate(createForm);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <RoomToastContainer />
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">Music Rooms</h1>
          <p className="text-white/70">
            Create or join rooms to share music with others
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column  */}
        <div className="space-y-6 lg:col-span-1">
          {/* Create Room Button */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Room</span>
            </button>
          </div>

          {/* Join Room */}
          <JoinRoom
            joinRoomId={joinRoomId}
            joinPassword={joinPassword}
            handleJoinRoom={handleJoinRoom}
            setJoinRoomId={setJoinRoomId}
            setJoinPassword={setJoinPassword}
            joinRoomMutation={joinRoomMutation}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Your Rooms */}
          <UserRooms userRooms={userRooms} />
        </div>
      </div>
      {/* Create Room Modal */}
      {showCreateForm && (
        <CreateRoomModal
          createForm={createForm}
          setCreateForm={setCreateForm}
          setShowCreateForm={setShowCreateForm}
          handleCreateRoom={handleCreateRoom}
          createRoomMutation={createRoomMutation}
        />
      )}
    </div>
  );
}
