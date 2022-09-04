import { TbMeat } from "react-icons/tb";
import { NavItem } from "./NavItem";
import { IoStorefrontSharp } from "react-icons/io5";
export const Navigator: React.FC = () => {
    return (
        <div className="dark:bg-primarydark-700 w-24 h-full flex-grow-0 flex-shrink-0 py-2">
            <div
                id="Navitems"
                className="flex flex-col h-full"
            >
                <NavItem
                    icon={
                        <TbMeat
                            className="rotate-180"
                            clip="true"
                            size={32}
                        />
                    }
                    active={true}
                />
                <NavItem
                    icon={
                        <IoStorefrontSharp
                            clip="true"
                            size={32}
                        />
                    }
                    active={false}
                />
            </div>
        </div>
    );
};
