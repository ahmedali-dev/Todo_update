import React, {useEffect, useRef, useState} from 'react';
import css from './Cards.module.scss';
import {Link, NavLink, useLocation} from "react-router-dom";
import {Delete, Edit} from "../icons/icons";
import Reload from "../Reloading/Reload";

const Cards = ({data, removeColl, removeState, sidePare = false, optionShow = true, ...props}) => {
    const option_btn = useRef(null);
    const location = useLocation();
    const completedTasklength = (task) => {
        const comp = task.filter(t => t.status);
        return comp.length;
    }
    useEffect(() => {
        try {
            const rowCards = document.querySelectorAll(`.${css.rowCard_card}`);

            const optContentAll = document.querySelectorAll(`.${css.rowCard_card_option_optContent}`);
            rowCards.forEach(rowCard => {
                const optionBtn = rowCard.querySelector(`.${css.rowCard_card_option_button}`);
                const optContent = rowCard.querySelector(`.${css.rowCard_card_option_optContent}`);
                const btnRemove = rowCard.querySelector(`.${css.rowCard_card_option_optContent_btnRemove}`);


                btnRemove.addEventListener('click', () => {
                    optContentAll.forEach(a => {
                        a.classList.remove(`${css.rowCard_card_option_optContent_active}`)
                    })
                })
                optionBtn.addEventListener('click', () => {
                    optContentAll.forEach(a => {
                        a.classList.remove(`${css.rowCard_card_option_optContent_active}`)
                    })
                    optContent.classList.toggle(`${css.rowCard_card_option_optContent_active}`);
                });
            });
        } catch (e) {
            console.log("rowcard error")
        }

    }, [data, removeColl]);

    if (sidePare) {
        return (
            <div className={`${css.rowCard} ${css.rowCardSidePare}`}>
                {data && data.map(d => {
                    return <div key={d.id} className={`${css.rowCard_card}`}
                                ref={option_btn}>
                        <NavLink style={({isActive}) => {
                            return isActive ? {background: 'var(--blueLight)', boxShadow: 'var(--shadowBlue)'} : null;
                        }} to={`/collections/${d.id}`} className={css.rowCard_card_link}>
                            <div className={css.rowCard_card_link_image}>
                                <img
                                    src={d.urlImage}
                                    alt=""/>
                            </div>
                            <div className={css.rowCard_card_link_content}>
                                <h2 className={css.rowCard_card_link_content_name}>{d.name}</h2>
                                <p className={css.rowCard_card_link_content_status}>
                                    {completedTasklength(d.tasks)}/{d.tasks.length}
                                </p>
                            </div>
                        </NavLink>
                        {optionShow && <div className={css.rowCard_card_option}>
                            <div className={css.rowCard_card_option_button}>
                                <div className={css.rowCard_card_option_button_optBtn}></div>
                                <div className={css.rowCard_card_option_button_optBtn}></div>
                                <div className={css.rowCard_card_option_button_optBtn}></div>
                            </div>
                            <div className={css.rowCard_card_option_optContent}>

                                <div className={css.rowCard_card_option_optContent_btnRemove}></div>

                                <div style={{position: 'relative'}} onClick={() => {
                                    if (!removeState.loading) {
                                        removeColl(d.id)
                                        return;
                                    }

                                    console.log('can not process this');
                                }}
                                     className={css.rowCard_card_option_optContent_btn}>

                                    {removeState && removeState.loading ? <Reload/> : <><Delete/> <p>delete</p></>}
                                </div>
                                <div onClick={() => {
                                    props.edit()
                                    props.editHanlder(d.id, d.name, d.urlImage);
                                }} className={css.rowCard_card_option_optContent_btn}><Edit/>
                                    <p>edit</p></div>
                                {/*<div className={css.rowCard_card_option_optContent_btn}><Delete/> delete</div>*/}
                            </div>
                        </div>}
                    </div>
                })}

            </div>
        );
    }
    // console.log(data)
    return (
        <div className={css.rowCard}>
            {data && data.map(d => {
                return <div key={d.id} className={css.rowCard_card} ref={option_btn}>
                    <Link to={`/collections/${d.id}`} className={css.rowCard_card_link}>
                        <div className={css.rowCard_card_link_image}>
                            <img
                                src={d.urlImage}
                                alt=""/>
                        </div>
                        <div className={css.rowCard_card_link_content}>
                            <h2 className={css.rowCard_card_link_content_name}>{d.name}</h2>
                            <p className={css.rowCard_card_link_content_status}>
                                {completedTasklength(d.tasks)}/{d.tasks.length}
                            </p>
                        </div>
                    </Link>
                    {optionShow && <div className={css.rowCard_card_option}>
                        <div className={css.rowCard_card_option_button}>
                            <div className={css.rowCard_card_option_button_optBtn}></div>
                            <div className={css.rowCard_card_option_button_optBtn}></div>
                            <div className={css.rowCard_card_option_button_optBtn}></div>
                        </div>
                        <div className={css.rowCard_card_option_optContent}>

                            <div className={css.rowCard_card_option_optContent_btnRemove}></div>

                            <div style={{position: 'relative'}} onClick={() => {
                                if (!removeState.loading) {
                                    removeColl(d.id)
                                    return;
                                }

                                console.log('can not process this');
                            }}
                                 className={css.rowCard_card_option_optContent_btn}>

                                {removeState && removeState.loading ? <Reload/> : <><Delete/> <p>delete</p></>}
                            </div>
                            <div onClick={() => {
                                props.edit()
                                props.editHanlder(d.id, d.name, d.urlImage);
                            }} className={css.rowCard_card_option_optContent_btn}><Edit/>
                                <p>edit</p></div>
                            {/*<div className={css.rowCard_card_option_optContent_btn}><Delete/> delete</div>*/}
                        </div>
                    </div>}
                </div>
            })}

        </div>
    );
};

export default Cards;