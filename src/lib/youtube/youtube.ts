// lib/youtube.ts
import { youtube as yt } from "@googleapis/youtube";

const youtube = yt({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export { youtube };

// Types for YouTube API responses
export type YouTubeVideo = {
  id: string;
  snippet: {
    title: string;
    artist: string;
  };
};

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
  };
}
