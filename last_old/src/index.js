import React from "react";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Store} from "./store/Store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <BrowserRouter>
            <Provider store={Store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </>
);
