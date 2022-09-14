import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setErrorMap } from "zod";

export default function UserPage() {
    const { status, data: user } = trpc.useQuery(["user.getUser"]);

    const [error, setError] = useState<string | null>(null);
    const [usernameInput, setUsernameInput] = useState(user?.name || "");
    const mutation = trpc.useMutation(["user.updateUsername"]);
    const router = useRouter();
    async function handleSaveButton() {
        setError(null);
        try {
            if (!usernameInput || usernameInput.length < 3) {
                setError("Username must be at least 3 characters long");

                return;
            }

            await mutation.mutateAsync({ username: usernameInput });
            router.reload();
        } catch (error: any) {
            if (error.message) {
                setError(error.message);
            }
        }
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!user) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">You are not logged in</h1>
                <Link href="/signin">
                    <a className="text-2xl font-bold text-primary-500">Sign in</a>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="mt-8 flex w-full flex-col items-center">
                {error && <div className="inset-0 m-4 rounded-lg bg-ecored-500/30 p-8">{error}</div>}
                <div className="flex w-1/2 grid-cols-2 flex-col gap-5 rounded p-10 dark:bg-primarydark-500">
                    <div className="flex flex-row">
                        <div className="flex w-2/5 flex-col justify-end gap-10 text-base">
                            <h1>Username:</h1>
                            <h2>Email:</h2>
                        </div>
                        <div className="flex w-3/5 flex-col justify-center gap-10">
                            <input
                                className="h-8 w-5/6 border-b-2 bg-transparent text-lg"
                                defaultValue={user.name || ""}
                                onChange={(e) => setUsernameInput(e.target.value)}
                            ></input>
                            <h2>{user.email}</h2>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveButton}
                        className="mt-4 h-10 w-16 self-end rounded-md disabled:cursor-not-allowed disabled:opacity-30 dark:bg-ecogreen-700"
                        disabled={usernameInput === ""}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
