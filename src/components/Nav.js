import React from "react";
import "./style/Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contextApi/use-Auth";
import { useHistory } from "react-router-dom";
import { wait } from "@testing-library/react";

export default function Nav() {
  const history = useHistory();
  const { signout, user } = useAuth();
  const logOut = async () => {
    await signout();
    history.push("/login");
  };
  let isLogined = user ? (
    <li>
      <a onClick={logOut}>Log Out</a>
    </li>
  ) : (
    <li>
      <NavLink activeClassName="active" exact to="/login">
        Đăng Nhập
      </NavLink>
    </li>
  );

  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Thêm Thông Tin Khách Hàng
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/seeOrder">
            Xem Đơn Hàng
          </NavLink>
        </li>
        {isLogined}
      </ul>
    </div>
  );
}
