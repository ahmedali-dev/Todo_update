import css from "./Items.module.scss";
import Input from "../../../../../src/components/UI/Input";
import Button from "../../../../../src/components/UI/Button";
import {Mark} from "../../../../../src/components/icons/icons";

import Loader from "../../../../../src/components/UI/Loader";
import {useState} from "react";
import {AddCollectionItems, UpdateCollectionItem} from "../../../hooks/FetchCollectionsHook";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {ChangeIsloading} from "../../../store/Slices/RegisterSlice";


const color = () => {
    let c = "1234567890abcdef";

    let col = "#";

    for (let i = 0; i < 6; i++) {
        col += c[Math.floor(Math.random() * (c.length - 1))];
    }

    return col;
};

const Items = ({data, collId, loading, isloading, ...props}) => {
    const [gettodo, setTodo] = useState('');
    const dispatch = useDispatch();
    const [getdata, error, FetchData] = AddCollectionItems({loading: isloading, id: collId, task: gettodo});
    const [getdataupdate, errorupdate, FetchDataupdate] = UpdateCollectionItem({
        loading: isloading,
        id: collId,
        task: gettodo
    });
    const additemhanlder = (e) => {
        e.preventDefault();
        FetchData();
        setTimeout(() => dispatch(ChangeIsloading()), 100);
    }

    const taskHanlder = (id, collid) => {
        FetchDataupdate(id, collid);
        setTimeout(() => dispatch(ChangeIsloading()), 100);
    }

    if (error) {
        toast.error(error);
    }

    if (errorupdate) {
        toast.error(errorupdate);
    }

    if (loading) {
        return <Loader/>
    }

    // props.data.item.map(i => console.log(i.id))
    const todo = (id, task, comp = false) => {
        return (<div key={id} className={css.items_item_task}>
            <div
                className={css.items_item_task_linec}
                style={{
                    background: `${color()}`,
                }}
            ></div>
            <div className={`${css.items_item_task_ta} ${comp && css.items_item_task_comp}`}>
                <div className={`${css.items_item_task_ta_checkBox} ${comp && css.completed}`}>
                    {!comp ?
                        <input
                            key={id}
                            onClick={(e) => {
                                taskHanlder(id, collId);
                            }}
                            type="checkbox" id={id}
                        /> :
                        <input
                            defaultChecked
                            key={id}
                            onClick={(e) => {
                                taskHanlder(id, collId);
                            }}
                            type="checkbox" id={id}
                        />}
                    <label htmlFor={id}>
                                    <span>
                                       <Mark/>
                                    </span>
                    </label>
                </div>
                <div className={`${css.items_item_task_ta_name} ${comp && css.items_item_task_comp_name}`}
                >
                    {task}
                </div>
            </div>
        </div>);
    }


    return (
        <>
            <div className={css.items}>
                <div className={css.items_item}>
                    <div className={css.items_item_name}>
                        Tasks - {data.item && data.item.filter(i => i.status == false).length}
                    </div>
                    {data.item && data.item.map(i => {
                        if (!i.status) {
                            return todo(i.id, i.task)
                        }
                    })}

                </div>

                <div className={css.items_item}>
                    <div className={css.items_item_name}>
                        Tasks - {data.item && data.item.filter(i => i.status != false).length}
                    </div>

                    {data.item && data.item.map(i => {
                        if (i.status) {
                            return todo(i.id, i.task, true)
                        }
                    })}
                </div>


                <div className={css.margin}></div>
            </div>
            <div
                className={css.addbtn}
                // onClick={() => props.setAdditem(!additem)}
            >
                <form onSubmit={additemhanlder}>
                    <Input classname={css.input}
                           onChange={(e) => setTodo(e.target.value)}
                           key={'addToDo'} placeholder={'Write new ToDo'}/>
                    <Button classname={css.button} text={<i className="las la-plus"></i>}/>
                </form>
            </div>
        </>
    );
};

export default Items;
