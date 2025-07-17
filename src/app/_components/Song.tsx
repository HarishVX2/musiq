import {
  Play,
  ChevronDown,
  ChevronUp,
  Heart,
  MoreVertical,
} from "lucide-react";

export type SongType = {
  id: number;
  title: string;
  artist: string;
  votes: number;
  addedBy: string;
  timeAdded: string;
  status: string;
  duration?: string;
  album?: string;
};

export type SongProps = {
  song: SongType;
  index: number;
  voteForSong: (songId: number, increment?: boolean) => void;
};

export const Song = ({ song, index, voteForSong }: SongProps) => {
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
            {song.status === "playing" ? (
              <Play className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </div>
          <div className="flex-1">
            <h3 className="flex items-center font-medium text-white">
              {song.title}
              {song.status === "playing" && (
                <span className="ml-2 rounded-full bg-purple-500 px-2 py-1 text-xs">
                  NOW PLAYING
                </span>
              )}
            </h3>
            <p className="text-sm text-white/70">{song.artist}</p>
            <p className="text-xs text-white/50">
              Added by {song.addedBy} • {song.timeAdded}
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
              <span className="font-medium">{song.votes}</span>
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
