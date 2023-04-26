import React, { useContext } from "react";
import css from "./Account.module.scss";
import Button from "../components/UI/Button";
import authContext from "../Store/Auth-context";

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

const Account = () => {
  const ctx = useContext(authContext);
  const userData = JSON.parse(b64_to_utf8(ctx.token));
  return (
    <div className={css.account}>
      <div className={css.account_header}>
        <div
          className={css.account_header_image}
          style={{
            backgroundImage: `url(${ctx.avatar})`,
          }}
        ></div>
        <h1 className={css.account_header_name}>{userData.name}</h1>
      </div>

      <div className={css.account_content}>
        <div className={css.account_content_group}>
          <h3>Name</h3>
          <p>{userData.name}</p>
        </div>
        <div className={css.account_content_group}>
          <h3>Email</h3>
          <p>{userData.email}</p>
        </div>
      </div>

      <Button
        onClick={ctx.logout}
        text={"Sign Out"}
        classname={css.account_signout}
      />
    </div>
  );
};

export default Account;
