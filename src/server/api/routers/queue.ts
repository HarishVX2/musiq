import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const queueRouter = createTRPCRouter({
  getSongs: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const queueSongs = await ctx.db.queue.findFirst({
          where: {
            id: input.id,
          },

          select: {
            songs: {
              select: {
                id: true,
                name: true,
                artist: true,
                url: true,
                addedById: true,
                _count: {
                  select: {
                    vote: true,
                  },
                },
              },
            },
          },
        });

        return queueSongs;
      } catch (e) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cannot find songs",
        });
      }
    }),
});
