import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {ChangeIsloading, LogoutAction, SignUpAction} from "../store/Slices/RegisterSlice";

const FetchCollectionsHook = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async () => {
        props.loading(true);
        const url = "http://192.168.1.6:8080/collections";
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token}),
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
                toast.error(response.error.token);
                dispatch(LogoutAction());

            }
            if (response.message) {
                dispatch(LogoutAction());
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            setData(response.data);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}
export const FetchCollectionItem = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async () => {
        props.loading(true);
        const url = `http://192.168.1.6:8080/collections/${props.id}`;
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token}),
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
                toast.error(response.error.token);
                dispatch(LogoutAction());
            }
            if (response.message) {
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            setData(response.data);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}

export const AddCollectionItems = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async () => {
        props.loading(true);
        const url = `http://192.168.1.6:8080/collections/${props.id}/add`;
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token, todo: props.task}),
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
                toast.error(response.error.todo);
                if (response.error.token) {
                    dispatch(LogoutAction())
                }
            }
            if (response.message) {
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            // setData(response.data);
            toast.success(response.message);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}

export const UpdateCollectionItem = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async (id, collid) => {
        props.loading(true);
        const url = `http://192.168.1.6:8080/collections/${collid}/update`;
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token, todoId: id}),
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
                toast.error(response.error.todo);
                if (response.error.token) {
                    dispatch(LogoutAction())
                }
            }
            if (response.message) {
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            // setData(response.data);
            toast.success(response.message);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}

export const FetchAccountData = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async () => {
        props.loading(true);
        const url = `http://192.168.1.6:8080/account`;
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token}),
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
                toast.error(response.error.todo);
                if (response.error.token) {
                    dispatch(LogoutAction())
                }
            }
            if (response.message) {
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            setData(response.data);
            // toast.success(response.message);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}

export const UpdateAccountData = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async (name, email, image) => {
        console.log(name, email, image)
        props.loading(true);
        const url = `http://192.168.1.6:8080/account/update`;
        const formdata = new FormData();
        formdata.append('token', token);
        formdata.append('name', name)
        formdata.append('email', email);
        formdata.append('image', image);
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: formdata,

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
                response.error.image && toast.error(response.error.image);
                if (response.error.token) {
                    dispatch(LogoutAction())
                }
            }
            if (response.message) {
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            setData(response.data);
            toast.success(response.message);
            localStorage.setItem('token', response.token);
            localStorage.setItem('image', response.userImage)
            dispatch(SignUpAction({token: response.token, userImage: response.image}))
            setTimeout(() => {
                dispatch(ChangeIsloading());
                props.loading(false);
            }, 1000)

        }

        props.loading(false);

    }


    return [data, error, FetchData];
}
export default FetchCollectionsHook;