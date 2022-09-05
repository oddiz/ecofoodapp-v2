export const NavItem = ({
    icon,
    active,
    onClickHandler,
}: {
    icon: JSX.Element;
    active: boolean;
    onClickHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
    return (
        <div
            className={`peer relative flex h-20 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg ${
                active
                    ? "border-t-[1px] border-t-primarydark-400 bg-primary-300 text-primary-150 dark:bg-primarydark-900"
                    : "text-primary-500 hover:bg-primary-300 hover:text-primary-150 dark:hover:bg-primarydark-650"
            }`}
            onClick={onClickHandler}
        >
            {active && ( // Glow effect
                <div className="absolute inset-0 h-full w-full -translate-y-12 scale-125 bg-gradient-radial from-primary-600/50 via-transparent " />
            )}
            {icon}
        </div>
    );
};
