import {useRef, useState} from "react";
import Button from "../../../../src/components/UI/Button";
import Input from "../../../../src/components/UI/Input";
import css from "./AccountInfo.module.scss";
import {useSelector} from "react-redux";

const Edit = (props) => {
    const {userImage} = useSelector(state => state.register);
    const [img, setImg] = useState();
    const [name, setName] = useState(props.data.name);
    const [email, setEmail] = useState(props.data.email);
    const image = useRef();
    const url = () => {
        console.log(image);
        // URL.createObjectURL(image.current.files[0])
        setImg(image.current.files[0]);
    };


    const saveHanlder = () => {
        props.EditeHanlder(img, name, email)
        props.Edit();
    }
    return (
        <>
            <div className={css.EditAccountInfo}>
                <div className={css.EditAccountInfo_img}>
                    <img src={`http://192.162.1.6:8080/${userImage}`} alt="user avatar"/>
                </div>
                <div className={css.EditAccountInfo_form}>
                    <form>
                        <Input
                            onChange={url}
                            ref={image}
                            type="file"
                            label="Select Avatar"
                            classname={css.file}
                        />

                        <Input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} label="Name"
                               placeholder="Name"/>
                        <Input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)}
                               label="Email"
                               placeholder="Email"/>
                        <Button text="Save" onClick={saveHanlder}/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
