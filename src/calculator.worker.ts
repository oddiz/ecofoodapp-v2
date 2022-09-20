import { CalculateSPResult, Food, IBestMenuMessage, IBestMenus, StartWorkerMessage } from "@/types/food";
import { menuNotValid, menuValid } from "./utils/checkMenuFilters";
import { generateRandomMenu } from "./utils/generateRandomMenu";
import getDefinitiveIterCount from "./utils/getDefinitiveIterCount";
import { processBestMenus } from "./utils/processBestMenus";

onmessage = function (e: MessageEvent<StartWorkerMessage>) {
    if (e.origin !== "ecoFood") {
        console.log("e.origin is not ecoFood, it is: " + e.origin);
        return;
    }

    e.data.message === "start_worker";
    testMenuWorker(e.data);
};

function testMenuWorker({ foods, filters, tastePreference }: StartWorkerMessage, option?: string) {
    console.time("Total_calculation_time");

    //randomizes and tests the active menu array
    ("use strict");

    function calculateSP(menu: Food[]): CalculateSPResult {
        //accepts an array of food objects

        function calculateTasteMult() {
            const totalCal = menu.reduce((total, food) => total + food.cal, 0);

            let calWeightedTaste = 0;

            for (const food of menu) {
                calWeightedTaste = calWeightedTaste + (tastePreference.get(food.id) || 1) * food.cal;
            }

            return calWeightedTaste / totalCal;
        }

        const tasteMultiplier = calculateTasteMult() || 1;
        const BASE_SP_GAIN = 12;
        const totals = menu.reduce(
            (total, food) => {
                total.carb += food.carb;
                total.fat += food.fat;
                total.vit += food.vit;
                total.pro += food.pro;
                total.cal += food.cal;
                total.price += food.price;
                return total;
            },
            { cal: 0, carb: 0, pro: 0, vit: 0, fat: 0, price: 0 }
        );

        const totalNutrients = totals.carb + totals.pro + totals.fat + totals.vit;
        const totalAverage = totalNutrients / totals.cal;

        const maxTotal = Math.max(totals.carb, totals.pro, totals.fat, totals.vit);
        const balancedMultiplier = (totalNutrients / (maxTotal * 4)) * 2;

        return {
            sp: BASE_SP_GAIN + totalAverage * balancedMultiplier * tasteMultiplier,
            foods: {
                menu: menu,
                stomach: foods.stomach,
            },
            multipliers: {
                balanced: balancedMultiplier,
                taste: tasteMultiplier,
            },
            totals: totals,
        };
    }

    if (option === "random" || !option) {
        const bestMenus: IBestMenus | null = null;

        console.info("Starting random");
        const startTime = Date.now();
        for (var i = 0; i <= 10000; i++) {
            try {
                const menuSize = 10;
                const randomMenu = generateRandomMenu(foods.selected, menuSize);

                if (menuNotValid(randomMenu, filters)) continue;

                const calcSpResult = calculateSP([...randomMenu, ...foods.stomach]);

                const { bests, updated } = processBestMenus(bestMenus, calcSpResult);
                if (updated) postBestMenuUpdate(bests);
            } catch (error) {
                console.error("Error in random calculation: ", error);
            }
        }
    }

    function postBestMenuUpdate(bestMenus: IBestMenus) {
        self.postMessage({
            op: "best_menu_update",
            data: bestMenus,
        } as IBestMenuMessage);
    }
    if (option === "definitive") {
        console.info("Starting definitive");
        calculateAllIterations(10);
    }

    function calculateAllIterations(menuSize: number) {
        const inputMenu = foods.selected;
        const totalIterations = getDefinitiveIterCount(foods.selected.length, menuSize);
        let counter = 0;

        partiteIdentical(menuSize, foods.selected.length);

        function partiteIdentical(menuSize: number, activeFoodsSize: number, args = [0], index = 0) {
            const bestMenus: IBestMenus | null = null;

            if (activeFoodsSize === 0) {
                const argsTotal = args.reduce(function (a, b) {
                    return a + b;
                });
                if (argsTotal === menuSize) {
                    const definitiveMenu = constructMenuFromArgs(args);

                    if (menuValid(definitiveMenu, filters)) {
                        const result = calculateSP([...definitiveMenu, ...foods.stomach]);
                        const { updated, bests } = processBestMenus(bestMenus, result);

                        if (updated) postBestMenuUpdate(bests);
                    }

                    counter += 1;
                }
            } else {
                const groupRest = activeFoodsSize - 1;

                for (args[index] = 0; args[index] < menuSize + 1; ++args[index]) {
                    partiteIdentical(menuSize, groupRest, args, index + 1);
                }
            }
        }

        function constructMenuFromArgs(args: number[]) {
            //[3,0,2,3]

            const calculateMenu: Food[] = [];

            args.forEach((ele: number, index: number) => {
                for (var i = 0; i < ele; i++) {
                    calculateMenu.push(inputMenu[index]);
                }
            });

            return calculateMenu;
        }
    }

    console.timeEnd("Total_calculation_time");

    postMessage({
        type: "calculation_end",
    });
}
