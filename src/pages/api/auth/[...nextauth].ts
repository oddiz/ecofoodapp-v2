import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "@/env/server.mjs";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        }),
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID as string,
            clientSecret: env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/",

        error: "/",
    },
};

export default NextAuth(authOptions);
