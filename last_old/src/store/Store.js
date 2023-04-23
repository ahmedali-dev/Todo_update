import {configureStore} from "@reduxjs/toolkit";
import RegisterSlice from "./Slices/RegisterSlice";
import CollectionSlice from "./Slices/CollectionSlice";

export const Store = configureStore({
    reducer: {
        register: RegisterSlice,
        collections: CollectionSlice,

    }
});