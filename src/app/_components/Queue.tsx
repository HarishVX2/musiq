"use client";
import { useState, useRef, type RefObject } from "react";
import { Clock, Play } from "lucide-react";
import LiteYoutubeEmbed from "react-lite-youtube-embed";
import { api as trpc } from "@/trpc/react";
import { showSuccessToast, showErrorToast } from "./Toast";
import { Song } from "./Song";

export const Queue = ({ id }: { id: string }) => {
  const [isOnTop, setIsOnTop] = useState(false);

  //refs
  const ytRef = useRef<HTMLIFrameElement>(null);

  //queries
  const {
    data: songs,
    refetch: refetchSongs,
    isPending,
    isError,
  } = trpc.queue.getSongs.useQuery(
    { id },
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const upvoteSongMutation = trpc.song.upvoteSong.useMutation({
    onSuccess: () => {
      showSuccessToast("Upvoted");
      refetchSongs();
    },
    onError: () => {
      showErrorToast("Could not upvote");
    },
  });

  const downvoteSongMutation = trpc.song.downvoteSong.useMutation({
    onSuccess: () => {
      showSuccessToast("Downvoted");
      refetchSongs();
    },
    onError: () => {
      showErrorToast("Downvoted already");
    },
  });

  const voteForSong = (songId: string, increment = true) => {
    if (increment) {
      upvoteSongMutation.mutate({ songId });
    } else {
      downvoteSongMutation.mutate({ songId });
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-semibold">
            <Play className="mr-2 h-5 w-5 text-purple-400" />
            Queue
          </h2>
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <Clock className="h-4 w-4" />
            <span>Live voting</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="w-content">
            <LiteYoutubeEmbed
              id="hl3-ZPg-JAA"
              title="Rich Spirit"
              ref={ytRef}
              enableJsApi
            />
          </div>
          {songs?.songs.map((song, index) => (
            <Song
              key={song.id}
              song={song}
              index={index}
              voteForSong={voteForSong}
              ytRef={ytRef as RefObject<HTMLIFrameElement>}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
