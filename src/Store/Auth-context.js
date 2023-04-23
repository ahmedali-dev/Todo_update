import {createContext, useState} from "react";

const AuthContext = createContext({
    token: '',
    avatar: '',
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    }
})

export const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialAvatar = localStorage.getItem('avatar');
    const [token, setToken] = useState(initialToken);
    const [avatar, setAvatar] = useState(initialToken);
    const userIsLogin = !!token;
    console.log('userIslogin', userIsLogin);

    const loginHandler = (token, avatar) => {
        setToken(token);
        setAvatar(avatar)
        localStorage.setItem('token', token);
        localStorage.setItem('avatar', avatar);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('avatar');
    }

    const contextValue = {
        token,
        avatar,
        isLoggedIn: userIsLogin,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;