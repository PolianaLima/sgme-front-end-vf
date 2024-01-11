import '@/styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {useEffect} from "react";
import {AuthProvider} from "@/context/authContext";
import MainContainer from "@/components/MainContainer";


export default function App({Component, pageProps}) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <AuthProvider>
            <MainContainer>
                <Component {...pageProps} />
            </MainContainer>
        </AuthProvider>


    )
}
