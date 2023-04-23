import css from './Register.module.scss';
import Input from '../../../../src/components/UI/Input';
import React from 'react';

const RegisterGinpu = ({label, error, ...props}) => {
    return (
        <>
            <Input classname={css.formGroup} label={label} error={error} {...props}/>
        </>
    );
};

export default RegisterGinpu;
