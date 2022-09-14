import { PieChartFromFood } from "@/components/PieChart";
import { Tooltip } from "@/components/Tooltip";
import { Food } from "@/types/food";
import Image from "next/image";
import { useState } from "react";
import { FaWeightHanging, FaFire, FaNutritionix } from "react-icons/fa";

export function FoodCard({ food }: { food: Food }) {
    const [showPie, setShowPie] = useState(false);
    const totalNutrients = food.carb + food.fat + food.pro + food.vit;
    return (
        <div className="flex h-full w-full flex-col overflow-visible rounded-lg border-[1px] bg-primarydark-500 p-4 dark:border-primarydark-100">
            <div className="flex h-full flex-row">
                <div className="flex h-full flex-1 flex-col">
                    <h1 className="overflow-ellipsis text-lg font-bold leading-tight">{food.name}</h1>
                    <h2 className="text-md dark:opacity-60">Tier {food.tier}</h2>
                    <div className="my-2 flex flex-row items-center ">
                        <Tooltip message="Weight">
                            <FaWeightHanging
                                height="2.5rem"
                                width="2.5rem"
                                className="text-base text-gray-400/40"
                            />
                        </Tooltip>
                        <div className="mx-1 text-sm font-bold text-primary-600/50">{food.weight}</div>
                        <Tooltip message="Calories">
                            <FaFire
                                height="2.5rem"
                                width="2.5rem"
                                className="ml-2 text-base text-ecoyellow-500/40"
                            />
                        </Tooltip>
                        <div className="mx-1 text-sm font-bold text-primary-600/50">{food.cal}</div>
                        <Tooltip message="Total Nutrients">
                            <FaNutritionix
                                height="2.5rem"
                                width="2.5rem"
                                className="ml-2 text-base text-ecogreen-300/70"
                            />
                        </Tooltip>
                        <div className="mx-1 text-sm font-bold text-primary-600/50">{totalNutrients}</div>
                    </div>
                </div>
                <div className=" flex h-full flex-shrink-0 flex-col items-end justify-between">
                    {!showPie && (
                        <Image
                            width={42}
                            height={42}
                            className={"justify-self-end "}
                            alt={food.name + " image"}
                            src={`/img/foods/${food.id}.png`}
                        />
                    )}
                    <div
                        onClick={() => setShowPie(!showPie)}
                        className={(showPie ? " h-full w-16" : "h-8 w-11") + " cursor-pointer justify-self-center  "}
                    >
                        <PieChartFromFood
                            interactive={true}
                            labels={showPie}
                            food={food}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
("absolute right-2 top-0 h-full w-16");
