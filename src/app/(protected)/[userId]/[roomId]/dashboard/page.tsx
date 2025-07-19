"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Play, Clock } from "lucide-react";
import LiteYoutubeEmbed from "react-lite-youtube-embed";
import { api as trpc } from "@/trpc/react";
import {
  Search,
  Song,
  QueueStats,
  showSuccessToast,
  showErrorToast,
  RoomToastContainer,
  Queue,
} from "@/app/_components";
import { type YouTubeSearchResult } from "@/lib/youtube/youtube";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([]);
  // const [activeQueue, setActiveQueue] = useState("main");
  const [isSearching, setIsSearching] = useState(false);

  const ytRef = useRef<HTMLIFrameElement>(null);
  // const [queues, setQueues] = useState(mainData);
  const params = useParams();
  const roomId =
    typeof params.roomId === "string"
      ? params.roomId
      : (params.roomId?.toString() ?? "");
  const {
    data: queue,
    isPending,
    isError,
  } = trpc.room.getRoomQueue.useQuery(roomId, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: songs,
    refetch: refetchSongs,
    isPending: songsPending,
    isError: songError,
  } = trpc.queue.getSongs.useQuery(
    { id: queue?.id || "" },
    { refetchOnWindowFocus: false, refetchOnMount: false },
  );

  // console.log(songs?.songs);
  // search
  const searchMutation = trpc.youtube.search.useQuery(
    { query: searchQuery, maxResults: 3 },
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: false }, //this option makes sure the query is not run initially
  );

  //mutations
  const addSongMutation = trpc.song.addSongToQueue.useMutation({
    onSuccess: () => {
      showSuccessToast("Song Added");
    },
    onError: () => {
      showErrorToast("Song already in queue");
    },
  });

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const fetchResults = async () => {
        const filtered = await searchMutation.refetch();
        console.log(filtered.data?.videos);
        setSearchResults(filtered.data?.videos || []);
        setIsSearching(false);
      };
      fetchResults();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const addToQueue = async (song: YouTubeSearchResult) => {
    console.log(song);
    const newQueueItem = {
      songId: song.id.videoId,
      name: song.snippet.title,
      artist: song.snippet.channelTitle,
      // votes: 1,
      // addedBy: queue?.ownerId,
      // status: "queued",
    };

    addSongMutation.mutate(newQueueItem);
    refetchSongs();

    // setQueues((prev) => ({
    //   ...prev,
    //   [activeQueue]: [...prev[activeQueue], newQueueItem],
    // }));
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <RoomToastContainer />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Search Section */}
          <div className="lg:col-span-1">
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={isSearching}
              searchResults={searchResults}
              addToQueue={addToQueue}
            />
            {/* <QueueStats queueStats={queueStats} activeQueue={activeQueue} /> */}
          </div>
          {/* Queue Section */}
          <Queue id={queue?.id || ""} />
        </div>
      </div>
    </>
  );
}
