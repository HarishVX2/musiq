import React from "react";
import { Plus, Search as SearchIcon } from "lucide-react";
import type { YouTubeSearchResult } from "@/lib/youtube/youtube";

export type SearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearching: boolean;
  searchResults: YouTubeSearchResult[];
  addToQueue: (song: YouTubeSearchResult) => void;
};

export const Search = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  searchResults,
  addToQueue,
}: SearchProps) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center text-xl font-semibold">
        <SearchIcon className="mr-2 h-5 w-5 text-purple-400" />
        Search Songs
      </h2>

      <div className="relative mb-4">
        <SearchIcon className="absolute top-3 left-3 h-5 w-5 text-white/50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for songs, artists..."
          className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pr-4 pl-10 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-400"></div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((song, index) => (
            <div
              key={index}
              className="rounded-xl bg-white/5 p-4 transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-white">
                    {song.snippet.title}
                  </h3>
                  <p className="truncate text-sm text-white/70">
                    {song.snippet.channelTitle}
                  </p>
                  {/* <p className="text-xs text-white/50">{song.duration}</p> */}
                </div>
                <button
                  onClick={() => addToQueue(song)}
                  className="ml-3 rounded-lg bg-purple-500 p-2 transition-colors duration-200 hover:bg-purple-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : searchQuery ? (
          <div className="py-8 text-center text-white/50">
            No songs found for "{searchQuery}"
          </div>
        ) : (
          <div className="py-8 text-center text-white/50">
            Start typing to search for songs
          </div>
        )}
      </div>
    </div>
  );
};
