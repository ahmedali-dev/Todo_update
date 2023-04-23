import {configureStore} from "@reduxjs/toolkit";
import style from './Style';
import TodoList from "./TodoList";


const Store = configureStore({
    reducer: {
        style: style,
        list: TodoList
    }
})

export default Store;