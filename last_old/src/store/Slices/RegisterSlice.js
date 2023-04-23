import {createSlice} from "@reduxjs/toolkit";


const intiState = {
    token: '',
    userImage: '',
    isloading: true
};
const RegisterSlice = createSlice({
    name: 'RegisterSlice',
    initialState: intiState,
    reducers: {
        SignUpAction: (state, action) => {
            const {token, userImage} = action.payload;
            state.token = token;
            state.userImage = userImage;
        },
        LogoutAction: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('image')
            state.token = null;
            state.userImage = null;
        },
        ChangeIsloading: (state) => {
            state.isloading = !state.isloading;
        }
    }
});

export const {SignUpAction, LogoutAction, ChangeIsloading} = RegisterSlice.actions;
export default RegisterSlice.reducer;