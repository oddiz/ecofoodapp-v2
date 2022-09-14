import { Popover } from "@headlessui/react";
import { FaSortNumericDown } from "react-icons/fa";

export function SortButton() {
    return (
        <Popover className="relative">
            <Popover.Button>
                <FaSortNumericDown />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 text-primary-600">
                <div className="flex w-40 flex-col rounded-xl text-lg dark:bg-primarydark-100">
                    <header className="flex h-12 items-center border-b-2 pl-4 dark:border-b-primarydark-300">
                        Sort Panel:
                    </header>
                    <div className="flex w-full flex-col p-2">
                        <a>Alphabetical</a>
                        <a>Tier</a>
                        <a>Type</a>
                        <a>Calories</a>
                        <a>Weight</a>
                        <a>Protein</a>
                        <a>Vitamin</a>
                        <a>Carbohydrate</a>
                        <a>Fat</a>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    );
}
