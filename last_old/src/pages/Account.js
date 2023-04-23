import {useEffect, useLayoutEffect, useState} from "react";
import Edit from "../components/account/Edit";
import AccountInfo from "./../components/account/AccountInfo";
import {useDispatch, useSelector} from "react-redux";
import {FetchAccountData, UpdateAccountData} from "../hooks/FetchCollectionsHook";
import {LogoutAction, SignUpAction} from "../store/Slices/RegisterSlice";
import {toast} from "react-hot-toast";
import Loader from "../../../src/components/UI/Loader";

const Account = (props) => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.register);
    const [loading, setLoading] = useState(false);

    const [data, error, FetchData] = FetchAccountData({token, loading: setLoading});
    const [dataupload, errorupload, FetchDataUpload] = UpdateAccountData({token, loading: setLoading})

    useEffect(() => {
        FetchData();
    }, [token]);


    if (error) {
        toast.error(error);
    }

    if (errorupload) {
        console.log(errorupload)
        errorupload.map(e => {
            e.image && toast.error(e.image)
            e.name && toast.error(e.name)
            e.email && toast.error(e.email)
        })
        // toast.error()
    }

    if (loading) {
        console.log('loading');
        return <Loader/>
    }
    const editehandler = () => setEdit(!edit);
    const EditeHanlder = (image, name, email) => {
        console.log(image, name, email)
        FetchDataUpload(name, email, image);
    }

    return (
        <div>
            {edit ? (
                <Edit EditeHanlder={EditeHanlder} data={data} Edit={editehandler}/>
            ) : (
                <AccountInfo setLoading={setLoading} data={data} Edit={editehandler}/>
            )}
            <div style={{marginTop: "13rem"}}></div>
        </div>
    );
};

export default Account;
