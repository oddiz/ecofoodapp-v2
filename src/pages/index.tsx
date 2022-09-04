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

            <main className="dark:bg-primarydark-600 bg-primary-100 w-screen h-screen flex flex-row">
                <Navigator />
                <div className="flex flex-col flex-1">
                    <Header />
                    <IndexContent />
                </div>
            </main>
        </div>
    );
};

export default Home;

