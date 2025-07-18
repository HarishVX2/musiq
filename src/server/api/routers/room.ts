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

        select: { id: true },
      });

      return room;
    }),

  join: protectedProcedure
    .input(z.object({ roomId: z.string(), passcode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const room = await ctx.db.room.update({
          where: {
            id: input.roomId,
          },
          data: {
            participants: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
        return room;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  getRoomQueue: roomProcedure.query(async ({ ctx }) => {
    const queue = ctx.room.queue;
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
