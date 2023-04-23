import {Link, NavLink} from "react-router-dom";
import css from "./Header.module.scss";
import {CollSvg, WishListSvg} from "../../../../src/components/icons/icons";
import {useSelector} from "react-redux";


const Header = (props) => {
    const {userImage} = useSelector(state => state.register);
    return (
        <nav className={css.nav}>
            <div className={css.nav_left}>
                <div className={css.nav_left_logo}>logo</div>
            </div>

            <div className={css.nav_right}>
                <div className={css.nav_right_list}>
                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/collections"}
                    >
                        <p className={css.icon}>
                            <CollSvg/>
                        </p>
                        <p className={css.text}>Collections</p>
                    </NavLink>


                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/wishlist"}
                    >
                        <p className={css.icon}>
                            <WishListSvg/>
                        </p>
                        <div className={css.text}>WishList</div>
                    </NavLink>

                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/account"}
                    >
                        {/* <p className={css.text}>Collections</p> */}

                        <img
                            src={`http://192.162.1.6:8080/${userImage}`}/>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;
