import { SignInModal } from "@/components/SignInModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInPage() {
    const router = useRouter();
    const onCloseHandler = () => {
        router.push("/", undefined, { shallow: true });
    };
    const { error } = router.query;
    const { data: session } = useSession();
    if (session) {
        router.push("/", undefined, { shallow: true });
    }

    return (
        <SignInModal
            onCloseHandler={onCloseHandler}
            isOpen={true}
            error={error}
        />
    );
}
