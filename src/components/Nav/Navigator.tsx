import { TbMeat } from "react-icons/tb";
import { NavItem } from "./NavItem";
import { IoStorefrontSharp, IoHeart } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";

export const Navigator: React.FC = () => {
    console.log("rendered");
    const navItems = [
        {
            id: "home",
            icon: <TbMeat size={24} />,
            link: "/",
        },
        {
            id: "shops",
            icon: <IoStorefrontSharp size={24} />,
            link: "/shop",
        },
        {
            id: "taste",
            icon: <IoHeart size={24} />,
            link: "/taste",
        },
    ];
    const [activePage, setActivePage] = useState("home");

    const handleNavItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const itemExists = navItems.some((item) => item.id === e.currentTarget.id);
        if (itemExists) setActivePage(e.currentTarget.id);
    };

    return (
        <div className="h-full w-24 flex-shrink-0 flex-grow-0 dark:bg-primarydark-700 ">
            <div className="relative mb-12 flex h-24  w-full flex-col p-5">
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
                className="flex-grow-1 flex-shrink-1 flex flex-col "
            >
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        active={item.id === activePage}
                        onClickHandler={handleNavItemClick}
                    />
                ))}
            </div>
        </div>
    );
};
