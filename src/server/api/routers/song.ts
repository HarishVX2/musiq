import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const songRouter = createTRPCRouter({
  addSongToQueue: protectedProcedure
    .input(
      z.object({
        songId: z.string().min(1),
        name: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const queue = await ctx.db.queue.findFirst({
        where: {
          ownerId: ctx.session.user.id,
        },
      });

      if (!queue)
        throw new TRPCError({ code: "NOT_FOUND", message: "No Queue" });

      const song = await ctx.db.song.create({
        data: {
          id: input.songId,
          name: input.name,
          addedById: ctx.session.user.id,
          url: input.url,
          queueId: queue.id,
        },
      });

      return Response.json({
        status: "success",
      });
    }),
});
