import { Popover } from "@headlessui/react";
import { FaFilter } from "react-icons/fa";

export function FilterButton() {
    return (
        <Popover className="relative">
            <Popover.Button>
                <FaFilter />
            </Popover.Button>

            <Popover.Panel className="absolute z-10">
                <div className="flex flex-col rounded-xl  p-12 text-lg dark:bg-primarydark-100">
                    <a>Analytics</a>
                    <a>Engagement</a>
                    <a>Security</a>
                    <a>Integrations</a>
                </div>
            </Popover.Panel>
        </Popover>
    );
}
