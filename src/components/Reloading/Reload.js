import css from './Reload.module.scss';

const Reload = ({mask = false, position = 'absolute', width = '2.5rem', border = '.4rem'}) => {
    return <div className={css.reload}
                style={{position: position}}
    >
        {mask && <div className={css.reload_mask}></div>}
        <div
            className={css.reload_reloadAnimation}
            style={{
                width: width,
                height: width,
                borderWidth: border
            }}
        ></div>
    </div>
}

export default Reload;