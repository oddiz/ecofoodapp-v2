import type { NextPage } from "next";
import Head from "next/head";
import { Navigator } from "../components/Nav/Navigator";

const Home: NextPage = () => {
    return (
        <div className="dark:bg-primarydark-600 bg-primary-100 w-screen h-screen flex flex-row ">
            <Head>
                <title>Eco Food App</title>
            </Head>

            <main>
                <Navigator />
                <div className="flex flex-col flex-grow-0 flex-shrink-0 w-full h-full"></div>
            </main>
        </div>
    );
};

export default Home;

