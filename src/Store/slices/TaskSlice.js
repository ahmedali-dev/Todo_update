import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../hooks/axios";
import {toast} from "react-hot-toast";


export const FetchDataTask = createAsyncThunk(
    'fetchdata',
    async ({token, id}) => {
        const request = await axios.post('/task', {token, id_collection: id})
        return await request.data;
    }
)


export const AddhDataTask = createAsyncThunk(
    'addData',
    async ({token, id, task}) => {
        const request = await axios.post('/task/add', {token, id_collection: id, task})
        return await request.data;
    }
)

const handleEndConcert = async (data, token, id) => {
    const datasend = new FormData();
    data.append('id_collection', id);
    data.append('token', token);
    data.append('data', JSON.stringify(data.length > 0 ? data[0]?.tasks : []));
    const request = await axios.post('/task/update', datasend);
    // {
    //     id_collection: params.id,
    //         token: ctx.token,
    //     data: JSON.stringify(fetchTask.data.length > 0 ? fetchTask.data[0]?.tasks : [])
    // }
    console.log(await request.data);
}


const initialState = {
    tokenError: '',
    fetch: {
        data: '',
        loading: false,
        error: {}
    },
    add: {
        loading: false,
        error: {}
    }
};
const TaskSlice = createSlice({
    name: 'taskslice',
    initialState,
    reducers: {
        ChangeStatusTask: (state, action) => {
            const data = action.payload;
            console.log(data);

            const dataChnage = state.fetch?.data[0]?.tasks.map(task => {
                if (task.id == data.id) {
                    task.status = !task.status;
                }

                return task
            })

            // console.log(dataChnage);
            state.fetch.data[0].tasks = dataChnage;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchDataTask.pending, (state) => {
                state.fetch.loading = true;
            })
            .addCase(FetchDataTask.fulfilled, (state, action) => {
                if (action.payload.status !== 200) {
                    if (action.payload?.error?.request) {
                        state.fetch.error.request = action.payload?.error?.request;
                    }
                    if (action.payload?.error?.token) {
                        state.tokenError = action.payload?.error?.token;
                    }
                    state.fetch.loading = false;
                    return;
                }

                state.fetch.data = action.payload?.data;
                state.fetch.loading = false;
            })
            .addCase(FetchDataTask.rejected, (state, action) => {
                state.fetch.loading = false;
                state.fetch.error.rejected = action.error.message;
            })
            .addCase(AddhDataTask.pending, (state) => {
                state.add.loading = true;
            })
            .addCase(AddhDataTask.fulfilled, (state, action) => {
                if (action.payload.status !== 200) {
                    if (action.payload?.error?.request) {
                        state.add.error.request = action.payload?.error?.request;
                    }
                    if (action.payload?.error?.token) {
                        state.tokenError = action.payload?.error?.token;
                    }
                    return;
                }

                toast.success(action.payload?.message);
                state.add.loading = false;
            })
            .addCase(AddhDataTask.rejected, (state, action) => {
                state.add.loading = false;
                state.add.error.rejected = action.error.message;
            })
    }
});


export const {ChangeStatusTask} = TaskSlice.actions;
export default TaskSlice.reducer;