const {createSlice} = require("@reduxjs/toolkit");

const init = {
    headerOpen: false
}
const Style = createSlice(
    {
        name: 'style',
        initialState: init,
        reducers: {
            openHeader: (state, action) => {
                state.headerOpen = !state.headerOpen;
            }
        }
    }
);


export const {openHeader} = Style.actions;
export default Style.reducer;