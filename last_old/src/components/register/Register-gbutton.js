import css from './Register.module.scss';
import Button from '../../../../src/components/UI/Button';

const RegisterGbutton = ({type, ...props}) => {
    return <>
        <>
            <Button classname={css.formGroup} text={type} {...props} />
        </>
    </>
}

export default RegisterGbutton
