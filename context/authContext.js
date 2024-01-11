import {createContext, useContext, useEffect, useState} from 'react';
import {getUserFromCookie, removeUserFromCookie, saveUserToCookie} from "@/utils/Cookies";
import {useRouter} from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();


    useEffect(() => {
        const storedUser = getUserFromCookie();
        if (storedUser) {
            setToken(storedUser.token);
            setUser(storedUser.usuario)
        }
    }, []);

    const login = (userData) => {
        setToken(userData.token);
        setUser(userData.usuario)
        saveUserToCookie(userData);
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        removeUserFromCookie('user');
        router.push("/login")
    };

    return (
        <AuthContext.Provider value={{ token,user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
