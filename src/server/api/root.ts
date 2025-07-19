import { roomRouter } from "@/server/api/routers/room";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { youtubeRouter } from "./routers/youtube";
import { songRouter } from "./routers/song";
import { queueRouter } from "./routers/queue";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  room: roomRouter,
  song: songRouter,
  youtube: youtubeRouter,
  queue: queueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
