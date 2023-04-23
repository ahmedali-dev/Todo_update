import Register from "../components/register/Register-form";
import Input from "../../../src/components/UI/Input";
import Button from "../../../src/components/UI/Button";
import css from "./../components/register/Register.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../../../src/components/UI/Loader";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {SignUpAction} from "../store/Slices/RegisterSlice";

const span = () => (
    <>
        You Have <span>Account ?</span>
    </>
);

function generateRandomString(length) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const Signup = (props) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setnameError] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const submith = async (e) => {
        e.preventDefault();
        setloading(true);
        const namev = name;
        const emailv = email;
        const passwordv = password;


        const signup = await fetch("http://192.162.1.6:8080/signup", {
            method: "POST",
            body: JSON.stringify({
                name: namev,
                email: emailv,
                password: passwordv,
            }),
        });
        if (!signup.ok) {
            toast.error("SignUp failed");
            setloading(false);
            return;
        }
        const data = await signup.json();
        if (data.status != 200) {
            toast.error("SignUp failed");
            setnameError(data.error.name && data.error.name);
            setemailError(data.error.email && data.error.email);
            setpasswordError(data.error.password && data.error.password);
            setloading(false);
        } else {
            toast.success(data.message);
            setloading(false);
            localStorage.setItem('image', data.userImage)
            localStorage.setItem('token', data.token);
            dispatch(SignUpAction({token: data.token, userImage: data.userImage}));
            navigate("collections");
        }
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <Register
            onSubmit={submith}
            link="/signin"
            selection={span()}
            header={"Welcome Back"}
        >
            <Input
                classname={css.formGroup}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                type="text"
                placeholder="Name"
                defaultValue={name}
                error={nameError && nameError}
            />
            <Input
                classname={css.formGroup}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
                placeholder="Email"
                defaultValue={email}
                error={emailError && emailError}
            />

            <Input
                classname={css.formGroup}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                placeholder="********"
                defaultValue={password}
                error={passwordError && passwordError}
            />
            <Button
                text={loading ? "loading" : "SignUp"}
                onClick={() => "hello"}
                disabled={loading ? true : ""}
                classname={css.formGroup}
            />
        </Register>
    );
};

export default Signup;
