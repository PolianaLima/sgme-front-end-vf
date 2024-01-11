import {useAuth} from "@/context/authContext";
import {useRouter} from "next/router";
import {useEffect} from "react";

export const getTokenVerify = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {token, user} = useAuth();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (token === null) {
            router.push("/")
        }
    }, [router, token]);
}