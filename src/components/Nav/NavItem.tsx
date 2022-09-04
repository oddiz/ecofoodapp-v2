export const NavItem = ({ icon, active }: { icon: JSX.Element; active: boolean }) => {
    return (
        <div
            className={`w-full h-20 flex items-center relative justify-center overflow-hidden rounded-lg cursor-pointer peer ${
                active
                    ? "dark:bg-primarydark-900 bg-primary-300 border-t-[1px] border-t-primarydark-400 text-primary-150"
                    : "text-primary-500"
            }`}
        >
            {active && ( // Glow effect
                <div className="w-full scale-125 h-full absolute inset-0 bg-gradient-radial from-primary-600/50 via-transparent -translate-y-12 " />
            )}
            {icon}
        </div>
    );
};
