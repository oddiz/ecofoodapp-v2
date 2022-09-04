import { useSearch } from "hooks/useSearch";
import { useState } from "react";

export const Search = () => {
    const { searchInput, setSearchInput } = useSearch();
    return (
        <div className="h-full min-w-[24rem] ">
            <input
                className="h-full w-full rounded-md dark:bg-primarydark-500 bg-primary-300 focus:dark:bg-primarydark-400 dark:text-primary-300 text-primarydark-400 text-lg bg-transparent px-3 outline-none"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
};
