import React, {useState} from "react";
import css from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openHeader} from './../../store/Style';

const Header = () => {
    const state = useSelector(state => state.style);
    const dispatch = useDispatch();
    console.log(state.headerOpen)

    return <nav className={css.nav}>
        <div
            onClick={() => dispatch(openHeader())}
            className={state.headerOpen ? `${css.activeTodoList} ${css.active}` : `${css.activeTodoList}`}><i
            className="las la-angle-double-right"></i></div>
        <div className={css.logo}>ToDo</div>
    </nav>;
};

export default Header;
