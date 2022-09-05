import { useState } from "react";

export const RightSection = () => {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <div className="flex h-full flex-row items-center justify-end">
            {signedIn ? (
                <></>
            ) : (
                <button className=" h-10 w-24 rounded border-2 border-secondary-800 text-center font-mono font-extralight hover:brightness-110  dark:text-secondary-200">
                    Sign In
                </button>
            )}
            <></>
        </div>
    );
};
