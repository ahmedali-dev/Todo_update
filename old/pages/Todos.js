import TodosList from "../components/todos/TodosList";
import css from "./todos.module.scss";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {Link, useParams} from "react-router-dom";
import TodoItems from "../components/todos/TodoItems";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {addTodoList, fetchData} from "../store/TodoList";
import {GetTodo, Ho} from "../Hooks/GetTodo";

const Todos = (props) => {

    const [addUi, setAddUi] = useState(false);
    const {data, isLoading} = useSelector(state => state.list)
    const {headerOpen} = useSelector(state => state.style);
    const params = useParams();

    const todoListText = useRef(null);
    const dispatch = useDispatch();
    const addtodoHanlder = (e) => {
        e.preventDefault()
        if (todoListText.current.value.length === 0) return;
        const data = {
            todo: todoListText.current.value,
            child: null
        };
        dispatch(addTodoList({addData: data}))
        dispatch(fetchData());
    }
    return (
        <div className={css.todocontainer}>

            <div className={`${css.todoList} ${headerOpen ? css.active : null}`}>
                <div className={css.form}>
                    <form action="" onSubmit={addtodoHanlder}>
                        <Input ref={todoListText} placeholder={'add todo'}/>
                        {/*onClick={() => setAddUi(!addUi)}*/}
                        <Button text={'new'}></Button>
                    </form>
                </div>
                {isLoading ? <div>isloading</div> : <div className={css.row_y}><TodosList list={data}/></div>}
            </div>
            {params.id ? <div className={css.todoItem}><TodoItems id={params.id}/></div> :
                <div className={'center'}>Select ToDo</div>}
        </div>
    );
};

export default Todos;
