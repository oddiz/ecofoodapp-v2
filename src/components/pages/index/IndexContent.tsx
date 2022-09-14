import { Food } from "@/types/food";
import { useNavigator } from "hooks/useNavigator";
import { useSearch } from "hooks/useSearch";
import { useEffect, useState } from "react";
import * as allFoods from "@/data/foodData";
import { CSSGrid, layout } from "react-stonecutter";
import { FilterButton } from "./FilterButton";
import { SortButton } from "./SortButton";
import { FoodCard } from "./FoodCard";

enum FoodType {
    "Raw",
    "Campfire",
    "Bakery",
    "Kitchen",
    "Cast Iron Stove",
    "Stove",
}
enum Filters {
    "Tier4",
    "Tier3",
    "Tier2",
    "Tier1",
    "Tier0",
}

export const IndexContent = () => {
    const { searchInput } = useSearch();
    const { setActivePage } = useNavigator();
    const [activeFoodTypes, setActiveFoodTypes] = useState<FoodType[]>([]);
    const [activeFilters, setActiveFilters] = useState<Filters[]>([]);
    useEffect(() => {
        setActivePage("home");
    }, [setActivePage]);
    return (
        <div className="h-full flex-1 overflow-hidden">
            <div
                id="foods_section"
                className="flex h-full w-1/3 flex-col border-r-2 border-r-primarydark-200/40"
            >
                <div className="flex h-16 w-full flex-shrink-0 flex-grow-0 flex-row items-center border-b-2 border-primarydark-200/40 border-b-primarydark-500/60  text-primary-950 dark:bg-primarydark-600">
                    <div className="mx- ml-6 h-8 w-8 cursor-pointer text-3xl hover:text-primary-600">
                        <SortButton />
                    </div>
                    <div className=" h-8 w-8 cursor-pointer text-center text-3xl hover:text-primary-600">
                        <FilterButton />
                    </div>
                </div>
                <div className="scrollbar flex-grow-1 flex w-full flex-row justify-center overflow-x-hidden overflow-y-scroll  pt-5 pb-10">
                    {/*@ts-ignore-next-line */}
                    <CSSGrid
                        component="div"
                        columns={2}
                        columnWidth={240}
                        itemHeight={120}
                        gutterWidth={5}
                        layout={layout.simple}
                        gutterHeight={5}
                        duration={150}
                        easing="ease-out"
                    >
                        {allFoods.slice(0, 8).map((food: Food) => {
                            return (
                                <div
                                    className="h-[120px] w-[240px]"
                                    key={food.id}
                                >
                                    <FoodCard food={food} />
                                </div>
                            );
                        })}
                    </CSSGrid>
                </div>
            </div>
        </div>
    );
};

/*
<FaChevronDown className=" mt-5 h-7 w-full justify-self-end text-center text-2xl text-primarydark-100" />
*/
