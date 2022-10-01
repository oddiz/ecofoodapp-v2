import { CalculateParameters, Food, IBestMenusMessage, IFilters, IFoods, ITastePref } from "@/types/food";
import getDefinitiveIterCount from "@/utils/getDefinitiveIterCount";
import { WorkerController } from "./WorkerController";

import EventEmitter from "eventemitter3";
const ITERATION_LIMIT = 10 ** 8;

export class Calculator extends EventEmitter {
    foods: IFoods;
    filters: IFilters;
    taste: ITastePref;
    maxMenuSize: number;
    workerControllers: WorkerController[];

    bestMenus: IBestMenusMessage["result"] | null;
    constructor(foods: IFoods, filters: IFilters, taste: ITastePref, maxMenuSize: number) {
        super();
        this.foods = foods;
        this.filters = filters;
        this.taste = taste;
        this.maxMenuSize = maxMenuSize || 10;

        this.bestMenus = null;
        this.workerControllers = [];
    }

    determineCalculateTypes() {
        const result = new Array(9).fill(0).map((_, index) => {
            const menuSize = index + 1;
            const totalIterations = getDefinitiveIterCount(this.foods.selected.length, menuSize);
            const calculateType: CalculateParameters["calculateType"] =
                totalIterations < ITERATION_LIMIT ? "definitive" : "random";
            return {
                menuSize,
                totalIterations,
                calculateType,
            };
        });
        return result;
    }

    spawnWorkers() {
        const calculateTypes = this.determineCalculateTypes();
        const workerControllers = calculateTypes.map(({ menuSize, calculateType }) => {
            const worker = new Worker("./calculator.worker.ts", {
                type: "module",
            });
            const workerController = new WorkerController(worker);
            workerController.start({
                foods: this.foods,
                filters: this.filters,
                taste: this.taste,
                menuSize: menuSize,
                calculateType: calculateType,
            });

            workerController.on("best_menus_update", () => {});
            return workerController;
        });
        this.workerControllers = workerControllers;
        return workerControllers;
    }

    refreshResults() {
        for (const workerController of this.workerControllers) {
            if (!this.bestMenus) {
                this.bestMenus = workerController.bestMenus;
                this.emit("best_menus_update", this.bestMenus);
            } else if (!workerController.bestMenus) {
                continue;
            } else {
                const newBestSp = workerController.bestMenus.scholar?.result.sp;
                const oldBestSp = this.bestMenus.scholar?.result.sp;

                if (newBestSp && oldBestSp && newBestSp > oldBestSp) {
                    this.bestMenus.scholar = workerController.bestMenus.scholar;
                    this.emit("best_menus_update", this.bestMenus);
                }
            }
        }
    }

    stop() {
        for (const workerController of this.workerControllers) {
            workerController.terminate();
        }

        this.workerControllers = [];
    }
}
