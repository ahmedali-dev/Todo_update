import Button from "../../../../src/components/UI/Button";
import css from "./AccountInfo.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {LogoutAction} from "../../store/Slices/RegisterSlice";
import {useEffect, useLayoutEffect, useState} from "react";
import Loader from "../../../../src/components/UI/Loader";
import {FetchAccountData} from "../../hooks/FetchCollectionsHook";
import {toast} from "react-hot-toast";

const AccountInfo = ({data, setLoading, ...props}) => {

    const dispatch = useDispatch();
    const SignOut = () => {
        setLoading(true);
        setTimeout(() => {
            dispatch(LogoutAction())
            setLoading(false);
        }, 3000);
    }
    return (
        <>
            <div className={css.AccountInfo}>
                <div className={css.AccountInfo_image}>
                    <div className={css.AccountInfo_image_img}>
                        <img
                            src={`http://192.162.1.6:8080/${data && data.userImage}`}/>
                        <Button text="Edit"/>
                    </div>
                    <div className={css.AccountInfo_image_name}>
                        <h1>{data && data.name}</h1>
                    </div>
                </div>

                <div className={css.info}>
                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Name</p>
                            <h3>{data && data.name}</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Edit"}
                            onClick={props.Edit}
                        />
                    </div>

                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Email</p>
                            <h3>{data && data.email}</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Edit"}
                            onClick={props.Edit}
                        />
                    </div>

                    <div className={css.info_card}>
                        <div className={css.info_card_info}>
                            <p>Password</p>
                            <h3>***********</h3>
                        </div>
                        <Button
                            classname={css.info_card_action}
                            text={"Change"}
                        />
                    </div>
                </div>
            </div>

            <Button classname={css.Signout} onClick={SignOut} text={"Sign Out"}/>
        </>
    );
};

export default AccountInfo;
