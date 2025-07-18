import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { youtube, type YouTubeSearchResult } from "@/lib/youtube/youtube";

export const youtubeRouter = createTRPCRouter({
  // Search for videos
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        maxResults: z.number().min(1).max(4).default(10),
        order: z
          .enum(["relevance", "date", "rating", "viewCount", "title"])
          .default("relevance"),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await youtube.search.list({
          part: ["snippet"],
          q: input.query,
          type: ["video"],
          maxResults: input.maxResults,
          order: input.order,
          videoCategoryId: "10",
        });

        console.log(response.data.items);
        return {
          videos: response.data.items as YouTubeSearchResult[],
          nextPageToken: response.data.nextPageToken,
        };
      } catch (error) {
        throw new Error("Failed to search YouTube videos");
      }
    }),
});
