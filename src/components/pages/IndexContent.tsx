import { useSearch } from "hooks/useSearch";

export const IndexContent = () => {
    const { searchInput } = useSearch();
    return <div className="flex flex-row flex-1 container p-6 mx-auto w-2/3">{searchInput}</div>;
};
