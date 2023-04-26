import React, { useContext } from "react";
import css from "./Navbar.module.scss";
import appicon from "./../components/icons/appicon.mp4";
import { NavLink } from "react-router-dom";
import { CollSvg, WishListSvg } from "../components/icons/icons";
import authContext from "../Store/Auth-context";

const Navbar = () => {
  const ctx = useContext(authContext);
  return (
    <nav className={css.nav}>
      <div className={css.nav_logo}>
        <div className={css.nav_logo_icon}>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline
            className={css.nav_logo_icon_video}
          >
            <source src={appicon} />
          </video>
        </div>
      </div>
      <div className={css.nav_content}>
        <div className={css.nav_content_item}>
          <NavLink
            className={({ isActive }) => {
              return isActive ? css.nav_content_item_linkActive : null;
            }}
            to={"/collections"}
          >
            <CollSvg />
            <span>Collections</span>
          </NavLink>
        </div>
        <div className={css.nav_content_item}>
          <NavLink
            className={({ isActive }) => {
              return isActive ? css.nav_content_item_linkActive : null;
            }}
            to={"/star"}
          >
            <WishListSvg />
            <span>Star</span>
          </NavLink>
        </div>
        <div className={css.nav_content_item}>
          <NavLink to={"/account"}>
            <span
              className={css.user}
              style={{ backgroundImage: `url(${ctx.avatar})` }}
            ></span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
