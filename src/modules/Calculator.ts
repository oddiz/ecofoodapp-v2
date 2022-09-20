import { Food, IFilters, IFoods, ITastePref } from "@/types/food";

const ITERATION_LIMIT = 10 ** 8;

export class Calculator {
    foods: IFoods;
    filters: IFilters;
    taste: ITastePref;
    constructor(foods: IFoods, filters: IFilters, taste: ITastePref) {
        this.foods = foods;
        this.filters = filters;
        this.taste = taste;
    }
}
