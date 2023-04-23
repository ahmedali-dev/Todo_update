import React, {useCallback, useContext, useEffect, useLayoutEffect} from 'react';
import {Link, unstable_useBlocker, useBeforeUnload, useLocation, useNavigate, useParams} from 'react-router-dom';
import css from './Item.module.scss'
import {Mark, ArrowDown, ArrowUp, Close, Add} from "../components/icons/icons";
import Todo from "../components/collections/Todo";
import Cards from "../components/collections/Cards";
import {useDispatch, useSelector} from "react-redux";
import {fetchCollectionData} from "../Store/slices/CollectionsSlice";
import authContext from "../Store/Auth-context";
import {Formik} from "formik";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import * as yup from 'yup';
import {AddhDataTask, FetchDataTask} from "../Store/slices/TaskSlice";
import Reload from "../components/Reloading/Reload";
import axios from "../hooks/axios";


const Items = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigation = useNavigate();
    const location = useLocation();
    const ctx = useContext(authContext);
    const params = useParams();
    const [showCollection, setShowCollection] = React.useState(false);
    const [showAddFrom, setShowAddFrom] = React.useState(false);
    const {fetch: fetchCollection} = useSelector(state => state.collections);
    const {fetch: fetchTask, add: addTask} = useSelector(state => state.task);

    const dispatch = useDispatch();

    useEffect(() => {
        setShowCollection(false);
        dispatch(FetchDataTask({token: ctx.token, id: params.id}))
    }, [params.id])

    useEffect(() => {
        dispatch(FetchDataTask({token: ctx.token, id: params.id}))
        if (fetchCollection.data.length == 0) {
            dispatch(fetchCollectionData(ctx.token));
        }
    }, []);


    // const handleLeavePage = () => {
    //     // navigate to a different page
    //     navigation('/collections');
    // };
    //
    // // add an event listener for beforeunload
    // window.addEventListener('beforeunload', handleLeavePage);

    // useBeforeUnload(
    //     useCallback(() => {
    //         localStorage.setItem('live', 'im live page' + Math.random());
    //         handleEndConcert();
    //     }),
    //     [params.id, location.pathname]
    // )

    // useLayoutEffect(() => {
    //     // handleEndConcert();
    // }, [params.id]);
    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser)
    //     window.addEventListener('unload', handleEndConcert)
    //     return () => {
    //         window.removeEventListener('beforeunload', alertUser)
    //         window.removeEventListener('unload', handleEndConcert)
    //         handleEndConcert()
    //     }
    // }, [])
    // const alertUser = (e) => {
    //     e.preventDefault()
    //     e.returnValue = ''
    //
    // }
    const handleEndConcert = async () => {
        const data = new FormData();
        data.append('id_collection', params.id);
        data.append('token', ctx.token);
        data.append('data', JSON.stringify(fetchTask.data.length > 0 ? fetchTask.data[0]?.tasks : []));
        const request = await axios.post('/task/update', data);
        // {
        //     id_collection: params.id,
        //         token: ctx.token,
        //     data: JSON.stringify(fetchTask.data.length > 0 ? fetchTask.data[0]?.tasks : [])
        // }
        console.log(await request.data);
    }

    useEffect(() => {
        console.log('change found')
    }, [location.pathname]);


    console.log(fetchTask.data);

    if (fetchTask.error) {
        console.log(fetchTask.error)
    }

    if (fetchTask.error) {
        console.log(fetchTask.error)
    }
    if (addTask.error) {
        console.log(addTask.error)
    }

    if (fetchCollection.loading || fetchTask.loading || addTask.loading) {
        return <Reload width={'8rem'} height={'8rem'} border={'.7rem'}/>
    }


    return (
        <div className={css.itemContainer}>

            {/*header*/}

            {/*collection popup for mobile and side lift in computer*/}
            {showCollection && <div className={css.itemContainer_collection}>
                <div onClick={() => setShowCollection(false)} className={css.itemContainer_collection_close}><Close/>
                </div>
                <Link to={'/collections'}>Collections</Link>
                <Cards data={fetchCollection.data} optionShow={false} sidePare={true}/>
            </div>}

            <div className={css.itemContainer_collection_computer}>
                <Link to={'/collections'}>Collections</Link>
                <Cards className={css.itemContainer_collection_computer_cardCollection} data={fetchCollection.data}
                       optionShow={false} sidePare={true}/>
            </div>
            {/*content*/}
            <div className={css.itemContainer_content}>
                <div className={css.itemContainer_content_header}>
                    <div onClick={() => {
                        setShowCollection(!showCollection)
                        console.log(fetchCollection.data);
                        if (fetchCollection.data.length === 0) {
                            dispatch(fetchCollectionData(ctx.token));
                        }
                    }}
                         className={css.itemContainer_content_header_showCollection}>
                        {showCollection ? <ArrowDown/> : <ArrowUp/>}
                    </div>
                    <h2 className={css.itemContainer_content_header_nameItem}>
                        {fetchTask.data.length > 0 && fetchTask.data[0].name}
                    </h2>
                </div>


                <div className={css.itemContainer_content_row}>
                    {fetchTask.data.length > 0 && fetchTask.data[0]?.tasks.map(task => {
                        return <Todo hanlderComplete={handleEndConcert} fetchTask={fetchTask} key={task.id} id={task.id}
                                     task={task.name}
                                     comp={task.status}/>
                    })}
                </div>


                <div className={css.itemContainer_additem}>
                    <div onClick={() => setShowAddFrom(true)}
                         className={`${css.itemContainer_additem_btn} ${showAddFrom ? css.itemContainer_additem_btn_active : null}`}>
                        <h3>New Task</h3>
                        <Add/>
                    </div>
                    <div
                        className={`${css.itemContainer_additem_form} ${showAddFrom && css.itemContainer_additem_form_active}`}>
                        <Formik
                            initialValues={{
                                task: ''
                            }}
                            validationSchema={yup.object({
                                task: yup.string().min(3).max(32).trim()
                            })}

                            onSubmit={(values) => {
                                if (values.task.length === 0) {
                                    setShowAddFrom(false);
                                    return;
                                }
                                dispatch(AddhDataTask({token: ctx.token, id: params.id, task: values.task}))

                                setTimeout(() => {
                                    if (!addTask.loading) {
                                        dispatch(FetchDataTask({token: ctx.token, id: params.id}))
                                    }
                                    setShowAddFrom(false);
                                }, 100)
                            }}>
                            {formik => (
                                <>
                                    <form action="" onSubmit={formik.handleSubmit}>
                                        <Input
                                            placeholder={'task name'}
                                            name={'task'}
                                            type={'text'}
                                            {...formik.getFieldProps('task')}
                                            error={formik.touched.task && formik.errors.task ? formik.errors.task : null}
                                        />
                                        <Button onClick={() => {
                                            // console.log( ? 'empty' : 'not')
                                            if (formik.values.task.length === 0) {
                                                setShowAddFrom(false);
                                            }
                                        }} text={<Add/>}/>
                                    </form>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            {/*add new items*/}


        </div>
    );
};

export default Items;