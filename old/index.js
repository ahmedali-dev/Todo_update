import React from "react";
import {RouterProvider} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import RouterApp from "./Router";
import {Provider} from "react-redux";
import Store from "./store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={Store}>
            <RouterProvider router={RouterApp}></RouterProvider>
        </Provider>
    </>
);
