import { useSearch } from "hooks/useSearch";

export const IndexContent = () => {
    const { searchInput } = useSearch();
    return (
        <div className="container mx-auto flex w-2/3 flex-1 flex-row p-6">
            <div>{searchInput}</div>
        </div>
    );
};
