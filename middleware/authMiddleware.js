import {useAuth} from '/context/authContext';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const AuthMiddleware = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    return isLoggedIn ? children : null;
};

export default AuthMiddleware;
