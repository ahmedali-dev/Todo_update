import css from './Loader.module.scss';

const Loader = () => {
    return <div className={css.Loader}>
        <div className={css.Loader_mask}></div>
        <div className={css.Loader_spander}></div>
    </div>;
};
export default Loader;
