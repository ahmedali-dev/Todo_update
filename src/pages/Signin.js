import {useContext, useRef, useState} from "react";
import AuthContext from "../Store/Auth-context";
import {Formik, isString} from 'formik';
import * as yup from 'yup';
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import css from "./Signup.module.scss";
import {Link} from "react-router-dom";
import authImage from './../components/icons/authImage.png';
import Reload from "../components/Reloading/Reload";
import {toast} from "react-hot-toast";
import instance from "../hooks/axios";

const Signin = () => {

    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    // const name = useRef();
    // const email = useRef();

    const submit = async (values, actions) => {
        setLoading(true);

        try {
            const req = await instance.post('/signin', {
                email: values.email,
                password: values.password
            });

            if (req.status !== 200) {
                toast.error("SignIn Filed");
            }


            const data = req.data;
            if (data?.status !== 200) {
                actions.setErrors({
                    email: data?.error?.email,
                    password: data?.error?.password
                });
                // eslint-disable-next-line no-unused-expressions
                isString(data?.error) ? toast.error(data?.error) : null;
            } else {
                toast.success(data.message);
                setTimeout(() => {
                    auth.login(data?.token, data?.avatar);
                }, 1000)
            }
        } catch (e) {
            toast.error(e.message());
        }
        setLoading(false);
        // setTimeout(() => {
        //     const data = JSON.stringify({email: values.email})
        //
        //     setTimeout(() => {
        //         toast.success('Signup successfully')
        //         auth.login(data);
        //
        //     }, 1000)
        // }, 2000);
    }
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={yup.object({
                    email: yup.string().min(3, 'Must be 3 character or large')
                        .max(100, 'Must be 100 character or less')
                        .email('Invalid email').required("Required"),
                    password: yup.string().min(8, 'Must be 8 character or large')
                        .max(32, "Must be 32 character or less")
                        .required("Required")
                })}
                onSubmit={submit}
            >
                {formik => (

                    <div className={css.auth}>
                        <div className={css.auth_header}>
                            <div className={css.auth_header_text}>Welcome Back</div>
                            <div className={css.auth_header_image}>
                                <img src={authImage} alt="auth logo"/>
                            </div>
                        </div>

                        <div className={css.auth_form}>
                            <div className={css.auth_form_text}>Welcome Back</div>
                            <form onSubmit={formik.handleSubmit}>
                                <Input
                                    classname={css.formGroup}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    name={'email'}
                                    className={css.formGroup_input}
                                    {...formik.getFieldProps('email')}
                                    error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                />

                                <Input
                                    classname={css.formGroup}
                                    label="Password"
                                    type="password"
                                    placeholder="********"
                                    name={'password'}
                                    className={css.formGroup_input}
                                    {...formik.getFieldProps('password')}
                                    error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                    // defaultValue={password}
                                    // error={passwordError && passwordError}
                                />
                                <div className={css.formGroup}>
                                    <Link className={css.formGroup_forgetPass} to={'/auth/signup'}>Forget
                                        a <span>password!</span></Link>
                                </div>
                                {/*text={"Signin"}*/}
                                <Button className={css.formGroup_btn} type={'submit'}
                                        text={loading ? <Reload/> : 'SignIn'}
                                        classname={css.formGroup}/>
                                <div className={css.formGroup}>
                                    <Link className={css.formGroup_redir} to={'/auth/signup'}>Create
                                        New <span>Account!</span></Link>
                                </div>
                            </form>
                        </div>
                    </div>

                )
                }
            </Formik>
        </div>
    )
}

export default Signin;