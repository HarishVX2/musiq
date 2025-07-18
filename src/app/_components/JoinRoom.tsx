import { UserPlus } from "lucide-react";
import type { Dispatch, SetStateAction, FormEvent } from "react";

type JoinRoomProps = {
  joinRoomId: string;
  joinPassword: string;
  setJoinRoomId: Dispatch<SetStateAction<string>>;
  setJoinPassword: Dispatch<SetStateAction<string>>;
  handleJoinRoom: (joinRoomId: string) => void;
  joinRoomMutation: {
    isPending: boolean;
  };
};

export const JoinRoom = ({
  joinRoomId,
  joinPassword,
  setJoinRoomId,
  setJoinPassword,
  handleJoinRoom,
  joinRoomMutation,
}: JoinRoomProps) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-white">Quick Join</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Room ID"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
        {joinRoomId && (
          <input
            type="password"
            placeholder="Password (if private)"
            value={joinPassword}
            onChange={(e) => setJoinPassword(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        )}
        <button
          onClick={() => handleJoinRoom(joinRoomId)}
          disabled={!joinRoomId || joinRoomMutation.isPending}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:bg-gray-600"
        >
          <UserPlus className="h-4 w-4" />
          <span>Join Room</span>
        </button>
      </div>
    </div>
  );
};
