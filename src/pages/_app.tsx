import "../styles/globals.css";
import { SearchProvider } from "hooks/useSearch";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Navigator } from "@/components/Nav/Navigator";
import { Header } from "@/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { NavProvider } from "hooks/useNavigator";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <NavProvider>
                <SearchProvider>
                    <Head>
                        <title>Eco Food App</title>
                    </Head>
                    <main className="flex h-screen flex-1 flex-row overflow-y-hidden bg-primary-100 dark:bg-primarydark-600">
                        <Navigator />
                        <div className="flex flex-1 flex-col">
                            <Header />
                            <Component {...pageProps} />
                        </div>
                    </main>
                </SearchProvider>
            </NavProvider>
        </SessionProvider>
    );
}

const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
    config() {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                httpBatchLink({ url }),
            ],
            url,
            transformer: superjson,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

            // To use SSR properly you need to forward the client's headers to the server
            // headers: () => {
            //   if (ctx?.req) {
            //     const headers = ctx?.req?.headers;
            //     delete headers?.connection;
            //     return {
            //       ...headers,
            //       "x-ssr": "1",
            //     };
            //   }
            //   return {};
            // }
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(MyApp);

