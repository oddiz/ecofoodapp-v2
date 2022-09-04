import { TbMeat } from "react-icons/tb";
import { NavItem } from "./NavItem";
import { IoStorefrontSharp, IoHeart } from "react-icons/io5";
import Image from "next/image";

export const Navigator: React.FC = () => {
    const handleNavItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e.currentTarget);
    };
    return (
        <div className="dark:bg-primarydark-700 w-24 h-full flex-grow-0 flex-shrink-0 ">
            <div className="w-full h-24 flex flex-col  mb-12 relative p-5">
                <Image
                    src="/logo.png"
                    alt="Eco Food App"
                    layout="intrinsic"
                    width={256}
                    height={256}
                    objectFit="contain"
                />
            </div>
            <div
                id="Navitems"
                className="flex flex-col flex-grow-1 flex-shrink-1 "
            >
                <NavItem
                    icon={
                        <TbMeat
                            className="rotate-180"
                            clip="true"
                            size={32}
                        />
                    }
                    onClickHandler={handleNavItemClick}
                    active={true}
                />
                <NavItem
                    icon={
                        <IoStorefrontSharp
                            clip="true"
                            size={32}
                        />
                    }
                    onClickHandler={handleNavItemClick}
                    active={false}
                />
                <NavItem
                    icon={
                        <IoHeart
                            clip="true"
                            size={32}
                        />
                    }
                    onClickHandler={handleNavItemClick}
                    active={false}
                />
            </div>
        </div>
    );
};
