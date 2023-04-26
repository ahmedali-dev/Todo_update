import { Navigate, useRoutes } from "react-router-dom";
import "./App.scss";
import React, { useContext } from "react";
import {
  AuthNotRequired as Authn,
  AuthRequired as Auth,
} from "./auth/AuthRequired";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import AuthContext from "./Store/Auth-context";
import SignUp from "./pages/SignUp";
import Collections from "./pages/Collections";
import Items from "./pages/Items";
import Star from "./pages/Star";
import Account from "./pages/Account";

const App = (props) => {
  const auth = useContext(AuthContext);
  const is_authed = auth.isLoggedIn;

  const router = useRoutes([
    Authn("/auth/signin", <Signin />, is_authed),
    Authn("/auth/signup", <SignUp />, is_authed),
    Auth("/", <Navigate to={"/collections"} />, is_authed),
    Auth("/collections", <Collections />, is_authed),
    Auth("/collections/:id", <Items />, is_authed),
    Auth("/star", <Star />, is_authed),
    Auth("/account", <Account />, is_authed),
    {
      path: "*",
      element: <div>page in found</div>,
    },
  ]);
  return (
    <>
      <Toaster />
      <main>{router}</main>
    </>
  );
};

export default App;
