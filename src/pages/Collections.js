import React, {useContext, useEffect, useState} from 'react';
import Cards from './../components/collections/Cards'
import css from './Collections.module.scss';
import {useDispatch, useSelector} from "react-redux";
import authContext from "../Store/Auth-context";
import {
    fetchCollectionData,
    addCollection as AddCollection,
    removeCollection,
    editCollection
} from "../Store/slices/CollectionsSlice";
import {Add} from "../components/icons/icons";
import Button from "../components/UI/Button";
import AddColl from "../components/collections/AddColl";
import {useLocation} from 'react-router-dom';
import Reload from "../components/Reloading/Reload";


const Collections = () => {

    const ctx = useContext(authContext);
    const location = useLocation();
    const {fetch, add, remove, edit: Edit, tokenError} = useSelector(state => state.collections);
    const [addcomp, setAddcomp] = useState(false);
    const [editValue, setEditValue] = useState({});
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();


    // console.dir(location)

    const ShowAddComp = () => {
        setAddcomp(!addcomp);
    }

    const addCollection = (name, url, actions) => {
        dispatch(AddCollection({token: ctx.token, name, image: url, closeAddComp: setAddcomp}));

        setTimeout(() => {
            dispatch(fetchCollectionData(ctx.token))
        }, 1000);
    }

    const removeColl = (id) => {
        dispatch(removeCollection({token: ctx.token, id}));
        setTimeout(() => {

            dispatch(fetchCollectionData(ctx.token))
        }, 1000);
    }

    const showEdit = () => {
        setEdit(!edit);
    }

    const EditHandler = (name, image) => {
        if (name !== editValue.name || image !== editValue.image) {
            dispatch(editCollection({token: ctx.token, id: editValue.id, name, image}))

            setTimeout(() => {
                setEdit(false);
                dispatch(fetchCollectionData(ctx.token))
            }, 1000);
        }
    }

    const getEditValueHandler = (id, name, image) => {
        setEditValue({id, name, image});
    }


    useEffect(() => {
        document.addEventListener('click', event => {

            if (!document.body.contains(event.target)) {
                setAddcomp(false);
            }

        });
        dispatch(fetchCollectionData(ctx.token))
        // console.log(fetch.data)
    }, [dispatch]);


    if (fetch.loading) {
        return <Reload width={'8rem'} height={'8rem'} border={'.7rem'}/>
    }

    if (fetch.error.error) {
        return <div>error</div>
    }

    if (tokenError) {
        return ctx.logout();
    }
    return (
        <div className={css.collections}>
            <div className={css.collections_header}>
                <h1>Collections</h1>
                <div></div>
            </div>

            <Cards editHanlder={getEditValueHandler} edit={showEdit} removeState={remove} removeColl={removeColl}
                   data={fetch.data}/>

            {addcomp && <AddColl addState={add} status={'add'} AddColl={addCollection} show={ShowAddComp}/>}
            {edit && <AddColl name={editValue?.name} status={'edit'} addState={Edit} editColl={EditHandler}
                              image={editValue?.image}
                              editText={'edit'} show={showEdit}/>}

            {/* add new collections */}
            <div className={css.collections_btn}>
                <Button classname={css.collections_btn_btn} text={<Add/>} onClick={ShowAddComp}/>
            </div>
        </div>
    );
};

export default Collections;
