import { z } from "zod";
import {
  publicProcedure,
  protectedProcedure,
  createTRPCRouter,
  roomProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";

export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        passcode: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.account.findFirst({
        where: { userId: ctx.session.user.id },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authroized",
        });
      }

      const room = await ctx.db.room.create({
        data: {
          name: input.name,
          passcode: input.passcode,
          ownerId: user.id,
          queue: {
            create: { ownerId: user.id },
          },
        },
      });

      return room;
    }),

  findRoom: roomProcedure.query(async ({ ctx }) => {
    const queue = await ctx.db.queue.findFirst({
      where: {
        roomId: ctx.room.id,
      },
    });

    return queue;
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.account.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authroized",
      });

    const rooms = await ctx.db.room.findMany({
      where: {
        ownerId: user.id,
      },
    });
    return rooms;
  }),
});
