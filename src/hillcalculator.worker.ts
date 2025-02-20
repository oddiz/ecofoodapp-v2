import {
  CalculateSPResult,
  Food,
  IBestMenusMessage,
  IBestMenus,
  StartWorkerMessage,
  ITastePref,
  CalculateParameters,
} from "@/types/food";
import { menuNotValid, menuValid } from "./utils/checkMenuFilters";
import { processBestMenus } from "./utils/processBestMenus";
import { calculateSP } from "@/utils/calculator/calculateSp";
import { generateRandomMenu } from "@/utils/calculator/generateRandomMenu";
import getDefinitiveIterCount from "@/utils/calculator/getDefinitiveIterCount";

onmessage = function (e: MessageEvent<StartWorkerMessage>) {
  if (e.data.message === "start_worker") {
    const tasteMap = new Map<string, number>(Object.entries(e.data.taste));

    e.data.taste = tasteMap;
    testMenuWorker(e.data);
  }
};

function testMenuWorker({
  foods,
  filters,
  taste,
  menuSize,
  calculateType,
}: CalculateParameters) {
  console.time("Total_calculation_time");

  //randomizes and tests the active menu array
  ("use strict");

  if (calculateType === "random") {
    const bestMenus: IBestMenus | null = null;

    console.info("Starting random");
    for (var i = 0; i <= 10000; i++) {
      try {
        const randomMenu = generateRandomMenu(foods.selected, menuSize);

        if (menuNotValid(randomMenu, filters)) continue;

        const calcSpResult = calculateSP(randomMenu, foods.stomach, taste);

        const { bests, updated } = processBestMenus(bestMenus, calcSpResult);
        if (updated) postBestMenuUpdate(bests);
      } catch (error) {
        console.error("Error in random calculation: ", error);
      }
    }
  }

  function postBestMenuUpdate(bestMenus: IBestMenus) {
    self.postMessage({
      op: "best_menus_update",
      result: bestMenus,
    } as IBestMenusMessage);
  }
  if (calculateType === "definitive") {
    console.info("Starting definitive");
    calculateAllIterations(menuSize);
  }

  function calculateAllIterations(menuSize: number) {
    const inputMenu = foods.selected;
    const totalIterations = getDefinitiveIterCount(
      foods.selected.length,
      menuSize
    );
    let counter = 0;

    partiteIdentical(menuSize, foods.selected.length);

    function partiteIdentical(
      menuSize: number,
      activeFoodsSize: number,
      args = [0],
      index = 0
    ) {
      const bestMenus: IBestMenus | null = null;

      if (activeFoodsSize === 0) {
        const argsTotal = args.reduce(function (a, b) {
          return a + b;
        });
        if (argsTotal === menuSize) {
          const definitiveMenu = constructMenuFromArgs(args);

          if (menuValid(definitiveMenu, filters)) {
            const result = calculateSP(definitiveMenu, foods.stomach, taste);
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
    op: "calculation_end",
  });
}
