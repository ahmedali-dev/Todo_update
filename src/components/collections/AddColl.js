import css from './AddColl.module.scss';
import {Formik} from "formik";
import * as yup from 'yup';
import Input from "../UI/Input";
import Button from "../UI/Button";
import Reload from "../Reloading/Reload";

const AddColl = ({AddColl, show, addState, status, editColl, ...props}) => {


    // console.log(props.name, props.image)
    const submit = (value, actions) => {
        switch (status) {
            case 'add':
                AddColl(value.name, value.url, actions);
                break;
            case 'edit':
                editColl(value.name, value.url);
                break;
            default:
                console.log('error switch');
                break;
        }
    }
    return (
        <div className={css.addcoll}>
            <Formik
                initialValues={
                    {
                        name: props.name ? props.name : '',
                        url: props.image ? props.image : ''
                    }
                }
                validationSchema={yup.object({
                    name: yup.string().min(3, 'Must be 3 character or large')
                        .max(32, "Must be 32 character or less")
                        .required("Name is Required"),
                    url: yup.string().url('url not valid')
                        .required("Name is Required"),
                })}
                onSubmit={submit}
            >
                {
                    formik => <>
                        <form className={css.addcoll_form} action="" onSubmit={formik.handleSubmit}>
                            <Input
                                label="Collection Name"
                                type="text"
                                placeholder="Collection Name"
                                name={'name'}
                                classname={css.formGroup_input}
                                {...formik.getFieldProps('name')}
                                error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                            />
                            <Input
                                label="Image Url"
                                type="text"
                                placeholder="Example: https://unsplash.com/image.jpg"
                                name={'url'}
                                classname={css.formGroup_input}

                                {...formik.getFieldProps('url')}
                                error={formik.touched.url && formik.errors.url ? formik.errors.url : null}
                            />
                            <div className={css.rowBtn}>
                                {
                                    props.editText
                                        ? <Button disabled={addState.loading}
                                                  text={addState && addState.loading ? <Reload/> : 'edit'}/>
                                        : <Button disabled={addState.loading}
                                                  text={addState && addState.loading ? <Reload/> : 'add'}/>}
                                <Button onClick={show} text={'cancel'}/>
                            </div>
                        </form>
                    </>
                }

            </Formik>
        </div>
    );
};

export default AddColl;