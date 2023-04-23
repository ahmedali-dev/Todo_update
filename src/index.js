import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Store/Auth-context";
import {Provider} from "react-redux";
import Store from "./Store/Store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <AuthProvider>
            <Provider store={Store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </AuthProvider>
    </>
);
