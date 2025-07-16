import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../trpc";

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
        throw new Error("User not authroized");
      }

      const queue = await ctx.db.queue.create({
        data: {
          ownerId: user.id,
        },
      });

      const room = await ctx.db.room.create({
        data: {
          name: input.name,
          passcode: input.passcode,
          ownerId: user.id,
          queueId: queue.id,
        },
      });

      return room;
    }),
});
