import {configureStore} from '@reduxjs/toolkit';
import CollectionsSlice from "./slices/CollectionsSlice";
import TaskSlice from "./slices/TaskSlice";


const Store = configureStore({
    reducer: {
        collections: CollectionsSlice,
        task: TaskSlice
    }
});

export default Store;