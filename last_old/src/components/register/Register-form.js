import {Link} from "react-router-dom";
import css from "./Register.module.scss";
import Input from "../../../../src/components/UI/Input";
import Button from "../../../../src/components/UI/Button";

const Register = ({header, selection, link, ...props}) => {
    return (
        <div className={css.register}>
            <div className={css.header}>
                <h1>{header}</h1>
            </div>
            <form className={css.form} {...props}>
                {props.children}

                <div className={css.formGroup}>
                    <Link to={link}>{selection}</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
