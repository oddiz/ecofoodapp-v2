import "../styles/globals.css";
import { SearchProvider } from "hooks/useSearch";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Navigator } from "@/components/Nav/Navigator";
import { Header } from "@/components/Header/Header";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <SearchProvider>
                <Head>
                    <title>Eco Food App</title>
                </Head>
                <main className="flex h-screen w-screen flex-row bg-primary-100 dark:bg-primarydark-600">
                    <Navigator />
                    <div className="flex flex-1 flex-col">
                        <Header />
                        <Component {...pageProps} />
                    </div>
                </main>
            </SearchProvider>
        </SessionProvider>
    );
}

export default MyApp;

