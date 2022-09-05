import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "@/components/Header/Header";
import { IndexContent } from "@/components/pages/IndexContent";
import { Navigator } from "@/components/Nav/Navigator";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>Eco Food App</title>
            </Head>

            <main className="flex h-screen w-screen flex-row bg-primary-100 dark:bg-primarydark-600">
                <Navigator />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <IndexContent />
                </div>
            </main>
        </div>
    );
};

export default Home;

