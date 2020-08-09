import React from "react";
import "./style/Nav.css";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div>
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
        <li>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
