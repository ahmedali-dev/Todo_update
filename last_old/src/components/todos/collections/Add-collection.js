import Input from "../../../../../src/components/UI/Input";
import Button from "../../../../../src/components/UI/Button";
import css from "./Add-collection.module.scss";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import Loader from "../../../../../src/components/UI/Loader";
import AddCollectionsHook from "../../../hooks/AddCollectionsHook";
import {ChangeIsloading} from "../../../store/Slices/RegisterSlice";

const AddCollections = ({placeholder, Cancel, remove, st, ...props}) => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const [errorV, setErrorV] = useState('');
    const [collectionValue, setCollection] = useState('');
    const collectionText = useRef(null);
    const cancel = useRef(null);
    const [error, fetchdata] = AddCollectionsHook({
        loading: setloading,
        Cancel,
        error: setErrorV,
        collection: collectionValue
    });
    useEffect(() => {
        collectionText.current?.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        fetchdata();
        dispatch(ChangeIsloading());

    };


    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <div
                className={remove ? `${css.mask} ${css.mask_remove}` : css.mask}
            ></div>
            <div
                className={
                    remove
                        ? `${css.AddCollections} ${css.add_remove}`
                        : css.AddCollections
                }
            >
                <form onSubmit={submitHandler}>
                    <Input
                        classname={css.formGroup}
                        placeholder={placeholder}
                        ref={collectionText}
                        onChange={(e) => setCollection(e.target.value)}
                        defaultValue={collectionValue}
                        type="text"
                        error={errorV && errorV}
                    />
                    <div className={css.btn_group}>
                        <Button classname={css.btn_group_item} text="Add"/>
                        <Button
                            classname={css.btn_group_item}
                            ref={cancel}
                            text="Cancel"
                            onClick={Cancel}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCollections;
