import { createProtectedRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";
export const userRouter = createProtectedRouter()
    .query("getUser", {
        resolve({ ctx }) {
            return ctx.session.user;
        },
    })
    .mutation("updateUsername", {
        input: z.object({
            username: z.string().min(3).max(20),
        }),
        async resolve({ ctx, input }) {
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    name: input.username,
                },
            });
            if (existingUser) {
                throw new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "Username already taken",
                });
                // return {
                //     error: {
                //         message: "Username already taken",
                //     },
                // };
            }

            return ctx.prisma.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    name: input.username,
                },
            });
        },
    });
