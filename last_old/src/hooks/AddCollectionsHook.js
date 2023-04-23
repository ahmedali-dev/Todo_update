import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {ChangeIsloading, LogoutAction} from "../store/Slices/RegisterSlice";


const AddCollectionsHook = (props) => {
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    // useEffect(() => {
    const FetchData = async () => {
        props.loading(true);
        const url = "http://192.168.1.6:8080/addcollections";
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token, collection: props.collection}),
                headers: {
                    'Content-Type': "application/json",
                    'auth': token
                }
            }
        )
        if (!request.ok) {
            props.loading(false);
            setError("connection error");
            return toast.error("connection error");
        }

        const response = await request.json();

        if (response.status !== 200) {
            if (response.error) {
                response.error.collection && props.error(response.error.collection)
                response.error.token && toast.error(response.error.token)// dispatch(LogoutAction());

            }
            if (response.message) {
                dispatch(LogoutAction());
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            toast.success(response.message);
            props.Cancel();
            props.loading(false);
            dispatch(ChangeIsloading());
        }

        props.loading(false);

    }
    // FetchData();
    // }, []);


    return [error, FetchData];
}


export default AddCollectionsHook;