import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const songRouter = createTRPCRouter({
  addSongToQueue: protectedProcedure
    .input(
      z.object({
        songId: z.string().min(1),
        name: z.string(),
        artist: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const url = `https://youtu.be/${input.songId}`;

      const acc = await ctx.db.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!acc)
        throw new TRPCError({ code: "FORBIDDEN", message: "Not Allowed" });

      const queue = await ctx.db.queue.findFirst({
        where: {
          ownerId: acc.id,
        },
      });

      if (!queue)
        throw new TRPCError({ code: "NOT_FOUND", message: "No Queue" });

      try {
        const song = await ctx.db.song.create({
          data: {
            id: input.songId,
            name: input.name,
            artist: input.artist,
            addedById: acc.id,
            url: url,
            queueId: queue.id,
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already in queue",
        });
      }

      return Response.json({
        status: "Song Added",
      });
    }),

  upvoteSong: protectedProcedure
    .input(z.object({ songId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const acc = await ctx.db.account.findFirst({
        where: { userId: ctx.session.user.id },
      });
      if (!acc)
        throw new TRPCError({ code: "FORBIDDEN", message: "Not Allowed" });

      const song = await ctx.db.song.findUnique({
        where: { id: input.songId },
      });
      if (!song)
        throw new TRPCError({ code: "NOT_FOUND", message: "Song not found" });

      try {
        await ctx.db.vote.upsert({
          where: {
            songId_userId: {
              songId: input.songId,
              userId: acc.id,
            },
          },
          update: { voteType: "UPVOTE" },
          create: {
            songId: input.songId,
            userId: acc.id,
            voteType: "UPVOTE",
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Could not upvote",
        });
      }
      return { status: "Upvoted" };
    }),

  downvoteSong: protectedProcedure
    .input(z.object({ songId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const acc = await ctx.db.account.findFirst({
        where: { userId: ctx.session.user.id },
      });
      if (!acc)
        throw new TRPCError({ code: "FORBIDDEN", message: "Not Allowed" });

      const song = await ctx.db.song.findUnique({
        where: { id: input.songId },
      });
      if (!song)
        throw new TRPCError({ code: "NOT_FOUND", message: "Song not found" });

      try {
        await ctx.db.vote.upsert({
          where: {
            songId_userId: {
              songId: input.songId,
              userId: acc.id,
            },
          },
          update: { voteType: "DOWNVOTE" },
          create: {
            songId: input.songId,
            userId: acc.id,
            voteType: "DOWNVOTE",
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Could not downvote",
        });
      }
      return { status: "Downvoted" };
    }),
});
