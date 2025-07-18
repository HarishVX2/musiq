"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Play, Clock } from "lucide-react";
import LiteYoutubeEmbed from "react-lite-youtube-embed";
import { mockSearchResults, queueStats, mainData } from "public/mock";
import { api as trpc } from "@/trpc/react";
import { Search, Song, QueueStats } from "@/app/_components";
import { type YouTubeSearchResult } from "@/lib/youtube/youtube";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([]);
  const [activeQueue, setActiveQueue] = useState("main");
  const [isSearching, setIsSearching] = useState(false);

  const ytRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queues, setQueues] = useState(mainData);
  const params = useParams();
  const roomId =
    typeof params.roomId === "string"
      ? params.roomId
      : (params.roomId?.toString() ?? "");
  const {
    data: queue,
    isPending,
    isError,
  } = trpc.room.getRoomQueue.useQuery(roomId);

  // search
  const searchMutation = trpc.youtube.search.useQuery(
    { query: searchQuery, maxResults: 3 },
    { enabled: false }, //this option makes sure the query is not run initially
  );

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const fetchResults = async () => {
        const filtered = await searchMutation.refetch();
        setSearchResults(filtered.data?.videos || []);
        setIsSearching(false);
      };
      fetchResults();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const addToQueue = (song) => {
    const newQueueItem = {
      id: Date.now(),
      title: song.title,
      artist: song.artist,
      votes: 1,
      addedBy: "You",
      timeAdded: "now",
      status: "queued",
    };

    setQueues((prev) => ({
      ...prev,
      [activeQueue]: [...prev[activeQueue], newQueueItem],
    }));
  };

  const voteForSong = (songId: number, increment = true) => {
    setQueues((prev) => ({
      ...prev,
      [activeQueue]: prev[activeQueue]
        .map((song) =>
          song.id === songId
            ? { ...song, votes: Math.max(0, song.votes + (increment ? 1 : -1)) }
            : song,
        )
        .sort((a, b) => b.votes - a.votes),
    }));
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-8">
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
            <QueueStats queueStats={queueStats} activeQueue={activeQueue} />
          </div>
          <button
            onClick={() => {
              setIsPlaying((oldState) => !oldState);
              ytRef.current?.contentWindow?.postMessage(
                `{"event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}"}`,
                "*",
              );
            }}
          >
            click me
          </button>
          <LiteYoutubeEmbed
            id="hl3-ZPg-JAA"
            title="Rich Spirit"
            ref={ytRef}
            enableJsApi
            style={{ display: "none" }}
          />
          {/* Queue Section */}
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
                {queues[activeQueue].map((song, index) => (
                  <Song
                    key={song.id}
                    song={song}
                    index={index}
                    voteForSong={voteForSong}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
