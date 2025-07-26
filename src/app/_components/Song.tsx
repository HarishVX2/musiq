"use client";
import {
  Play,
  ChevronDown,
  ChevronUp,
  Heart,
  MoreVertical,
  Pause,
} from "lucide-react";
import {
  forwardRef,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

export type SongType = {
  id: string;
  name: string;
  artist: string;
  url: string;
  _count: {
    vote: number;
  };
  addedById: string;
  timeAdded?: string;
  status?: string;
  duration?: string;
  album?: string;
};

export type SongProps = {
  song: SongType;
  index: number;
  voteForSong: (songId: string, increment?: boolean) => void;
  ytRef: RefObject<HTMLIFrameElement>;
};

export const Song = ({ song, index, voteForSong, ytRef }: SongProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div
      className={`rounded-xl border bg-white/5 p-4 transition-all duration-200 ${
        song.status === "playing"
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
          : "border-white/10 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
              song.status === "playing"
                ? "bg-purple-500 text-white"
                : "bg-white/10 text-white/70"
            }`}
          >
            {isPlaying ? (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  ytRef.current?.contentWindow?.postMessage(
                    `{"event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}"}`,
                    "*",
                  );
                }}
              >
                <Play className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsPlaying(true);
                  ytRef.current?.contentWindow?.postMessage(
                    `{"event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}"}`,
                    "*",
                  );
                }}
              >
                <Pause className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <h3 className="flex items-center font-medium text-white">
              {song.name}
              {song.status === "playing" && (
                <span className="ml-2 rounded-full bg-purple-500 px-2 py-1 text-xs">
                  NOW PLAYING
                </span>
              )}
            </h3>
            <p className="text-sm text-white/70">{song.artist}</p>
            <p className="text-xs text-white/50">
              Added by {song.addedById} • {song.timeAdded}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => voteForSong(song.id, false)}
              className="rounded p-1 transition-colors duration-200 hover:bg-white/10"
            >
              <ChevronDown className="h-4 w-4 text-white/70" />
            </button>
            <div className="flex items-center space-x-1 rounded-full bg-white/10 px-3 py-1">
              <Heart className="h-4 w-4 text-pink-400" />
              <span className="font-medium">{song._count.vote}</span>
            </div>
            <button
              onClick={() => voteForSong(song.id, true)}
              className="rounded p-1 transition-colors duration-200 hover:bg-white/10"
            >
              <ChevronUp className="h-4 w-4 text-white/70" />
            </button>
          </div>
          <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10">
            <MoreVertical className="h-4 w-4 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
