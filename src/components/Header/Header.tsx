import { Search } from "./Search";

export const Header = () => {
    return (
        <header className="w-full h-24 dark:bg-primarydark-650 flex flex-row py-5 px-5">
            <Search />
        </header>
    );
};
