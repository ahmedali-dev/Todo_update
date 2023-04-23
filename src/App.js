import {Navigate, Route, Routes, useRoutes} from "react-router-dom";
import "./App.scss";
import React, {useContext, useLayoutEffect} from "react";
import {AuthRequired as Auth, AuthNotRequired as Authn} from "./auth/AuthRequired";
import {Toaster} from "react-hot-toast";
import Signin from "./pages/Signin";
import AuthContext from "./Store/Auth-context";
import SignUp from "./pages/SignUp";
import Collections from "./pages/Collections";
import Items from "./pages/Items";


const App = (props) => {

    const auth = useContext(AuthContext);
    const is_authed = auth.isLoggedIn;

    const router = useRoutes([
            Authn('/auth/signin',
                <Signin/>,
                is_authed
            ),
            Authn('/auth/signup',
                <SignUp/>,
                is_authed
            ),
            Auth(
                '/',
                <Navigate to={'/collections'}/>,
                is_authed
            ),
            Auth(
                '/collections',
                <Collections/>,
                is_authed
            ),
            Auth(
                '/collections/:id',
                <Items/>,
                is_authed
            ),
            {
                path: '*',
                element: <div>page in found</div>
            }
        ]
    )
    return <>
        <Toaster/>
        <main>
            {router}
        </main>
    </>

}

export default App;
