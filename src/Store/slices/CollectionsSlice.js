import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../hooks/axios";
import {toast} from "react-hot-toast";
import {isString} from "formik";


export const fetchCollectionData = createAsyncThunk(
    'fetch/collectionData',
    async (token) => {
        const request = await axios.post('/collections', {token});
        return await request.data;
    });

export const addCollection = createAsyncThunk(
    'fetch/addcollection',
    async ({token, name, image, closeAddComp}) => {
        const request = await axios.post('/collections/add', {
            token,
            name,
            image
        })

        if (request.status == 200) {
            closeAddComp(false);
        }
        return await request.data;
    });

export const removeCollection = createAsyncThunk(
    'fetch/removeCollecction',
    async ({token, id}) => {
        const request = await axios.post('/collections/delete', {
            token, id
        });

        return await request.data;
    }
);

export const editCollection = createAsyncThunk(
    'fetch/editCollection',
    async ({token, id, name, image}) => {
        const request = await axios.post('/collections/edit', {
            token, id, name, image
        });

        return await request.data;
    }
);
const initialState = {
    tokenError: '',
    fetch: {
        data: [],
        error: '',
        loading: false,
    },
    add: {
        error: '',
        loading: false
    },
    remove: {
        inputError: {},
        error: '',
        loading: false
    },
    edit: {
        inputError: {},
        error: '',
        loading: false
    }
}


const CollectionsSlice = createSlice({
    name: 'collection',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollectionData.pending, (state) => {
                state.fetch.loading = true;
            })
            .addCase(fetchCollectionData.fulfilled, (state, action) => {
                state.fetch.loading = false;

                if (action.payload.status !== 200) {
                    if (action.payload?.error?.token) {
                        state.tokenError = action.payload.error.token
                    }
                    if (isString(action.payload?.error)) {
                        toast.error(action.payload?.error);
                    }
                    return;
                }

                state.fetch.data = action.payload.data;
            })
            .addCase(fetchCollectionData.rejected, (state, action) => {
                state.fetch.loading = false;
                state.fetch.error = action.error.message;
            })
            .addCase(addCollection.pending, (state) => {
                state.add.loading = true;
            })
            .addCase(addCollection.fulfilled, (state, action) => {
                state.add.loading = false;
                if (action.payload.status !== 200) {
                    if (action.payload?.error?.token) {
                        state.tokenError = action.payload.error.token
                    }
                    if (isString(action.payload?.error)) {
                        toast.error(action.payload?.error);
                        return;
                    }

                    action.payload.error.forEach(e => toast.error(e))
                    return;
                }

                toast.success(action.payload.message);
            })
            .addCase(addCollection.rejected, (state, action) => {
                state.add.loading = false;
                state.add.error = action.error.message;
            })
            .addCase(removeCollection.pending, (state) => {
                state.remove.loading = true;
            })
            .addCase(removeCollection.fulfilled, (state, action) => {
                state.remove.loading = false;
                if (action.payload?.status !== 200) {
                    if (!isString(action.payload?.error)) {
                        const error = action.payload?.error;
                        // eslint-disable-next-line no-unused-expressions
                        state.tokenError = error?.token;
                        state.remove.inputError.id = error?.request?.id;
                        state.remove.inputError.token = error?.request?.token;
                        return;
                    }

                    return;
                }
                toast.success(action.payload.message);
                return;

            })
            .addCase(removeCollection.rejected, (state, action) => {
                state.remove.error = action.error.message
            })
            .addCase(editCollection.pending, (state) => {
                state.edit.loading = true;
            })
            .addCase(editCollection.fulfilled, (state, action) => {
                state.edit.loading = false;
                if (action.payload?.status !== 200) {
                    if (!isString(action.payload?.error)) {
                        const error = action.payload?.error;
                        // eslint-disable-next-line no-unused-expressions
                        state.tokenError = error?.token;
                        state.edit.inputError.id = error?.request?.id;
                        state.edit.inputError.token = error?.request?.token;
                        state.edit.inputError.name = error?.request?.name;
                        state.edit.inputError.image = error?.request?.image;
                        return;
                    }

                    return;
                }
                toast.success(action.payload.message);
                return;

            })
            .addCase(editCollection.rejected, (state, action) => {
                state.edit.error = action.error.message
            })

    }
});

export default CollectionsSlice.reducer;