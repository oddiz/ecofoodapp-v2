import "../styles/globals.css";
import { SearchProvider } from "hooks/useSearch";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SearchProvider>
            <Component {...pageProps} />
        </SearchProvider>
    );
}

export default MyApp;

