import {useEffect, useLayoutEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addTodoList, getTodoList} from "../store/TodoList";

export const GetTodo = () => {
    const dispath = useDispatch();
    useEffect(() => {
        const getdata = async () => {
            const req = await fetch('https://sql.ahmedali-dev.repl.co/', {
                method: "POST"
            });
            const json = await req.json();
            dispath(getTodoList({data: json.data}))
        }

        getdata();
    }, [getTodoList()]);
}
