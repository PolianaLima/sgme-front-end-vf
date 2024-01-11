import Cookies from "js-cookie";

export const saveUserToCookie = (userData)=>{

    Cookies.set('user', JSON.stringify(userData))
}


export const getUserFromCookie = ()=>{
    const userData = Cookies.get('user');
    return userData ? JSON.parse(userData) : null;
}

export const removeUserFromCookie=()=>{
    return Cookies.remove('user')
}