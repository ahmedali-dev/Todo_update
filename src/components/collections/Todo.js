import React, {useContext, useEffect} from 'react';
import css from './Todo.module.scss';
import {Delete, Edit, Mark} from "../icons/icons";
import {useDispatch} from "react-redux";
import {ChangeStatusTask} from "../../Store/slices/TaskSlice";
import axios from "../../hooks/axios";
import {useParams} from "react-router-dom";
import authContext from "../../Store/Auth-context";

const Todo = ({id, task, comp, fetchTask, hanlderComplete}) => {
    const dispatch = useDispatch();
    const params = useParams();
    const ctx = useContext(authContext);

    useEffect(() => {
        const items = document.querySelectorAll(`.${css.items}`);
        const options = document.querySelectorAll(`.${css.items_item_task_options}`);
        items.forEach(item => {
            const button = item.querySelector(`.${css.items_item_task_linec}`);
            const option = item.querySelector(`.${css.items_item_task_options}`);
            button.addEventListener('click', () => {
                if (option.id) {
                    console.log('found class')
                    setTimeout(() => {
                        options.forEach(option => {
                            option.id = '';
                            option.classList.remove(css.items_item_task_options_active)
                            setTimeout(() => {
                                option.style.display = 'none';
                            }, 100);
                        })
                    }, 100);

                } else {
                    options.forEach(option => {
                        option.style.display = 'none';
                        option.id = '';
                        option.classList.remove(css.items_item_task_options_active)
                    })
                    // if (option.classList.value === 'Todo_items_item_task_options__SyoK3 Todo_items_item_task_options_active__DT8Vs') {
                    //     option.style.display = 'none';
                    //     option.classList.remove(css.items_item_task_options_active)
                    //     return;
                    // }
                    option.style.display = 'flex';
                    setTimeout(() => {

                        console.log('error')
                        option.id = 'active'
                        option.classList.add(css.items_item_task_options_active)
                    }, 100);
                }

            });


        })
    }, []);


    const handleEndConcert = async (id_task, status) => {
        const data = new FormData();
        data.append('id_collection', params.id);
        data.append('token', ctx.token);
        data.append('id_task', id_task);
        data.append('status', status)
        const request = await axios.post('/task/status', data);
        // {
        //     id_collection: params.id,
        //         token: ctx.token,
        //     data: JSON.stringify(fetchTask.data.length > 0 ? fetchTask.data[0]?.tasks : [])
        // }
        console.log(await request.data);
    }

    return (
        <div className={css.items} key={id}>
            <div
                className={css.items_item_task_linec}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`${css.items_item_task_ta} ${comp && css.items_item_task_comp}`}>
                <div className={`${css.items_item_task_ta_name} ${comp && css.items_item_task_comp_name}`}
                >
                    <label htmlFor={id}><p>{task}</p></label>
                </div>
                <div className={`${css.items_item_task_ta_checkBox} ${comp && css.completed}`}>
                    {!comp ?
                        <input
                            key={id}
                            type="checkbox"
                            onChange={() => {
                                dispatch(ChangeStatusTask({id}));
                                handleEndConcert(id, 'true');
                                console.log('change')
                            }} id={id}
                        /> :
                        <input
                            onChange={() => {
                                dispatch(ChangeStatusTask({id}));
                                handleEndConcert(id, 'false');
                                console.log('change')
                            }}
                            defaultChecked
                            key={id}
                            type="checkbox" id={id}
                        />}
                    <label htmlFor={id}>
                                    <span>
                                       <Mark/>
                                    </span>
                    </label>
                </div>
            </div>
            {/*action event*/}
            <div className={css.items_item_task_options}>
                <div className={css.items_item_task_options_option}><Edit/> <p>edit</p></div>
                <div className={css.items_item_task_options_option}><Delete/> <p>delete</p></div>
            </div>
        </div>
    );
};

export default Todo;