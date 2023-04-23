import {createSlice} from "@reduxjs/toolkit";
import FetchCollectionsHook from "../../hooks/FetchCollectionsHook";


const initialState = {
    collections: {}
};
const CollectionSlice = createSlice({
    name: "CollectionSlice",
    initialState,
    reducers: {
        FetchCollections: (state, action) => {
            const {data} = action.payload;
            state.collections = data;
        },
        AddCollectionsAction: (state, action) => {
            // fetch()
        }
    }
})

export const {FetchCollections} = CollectionSlice.actions;
export default CollectionSlice.reducer;