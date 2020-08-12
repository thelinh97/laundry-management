import React, { useState } from "react";
import "./style/LogIn.css";
import { useAuth } from "../contextApi/use-Auth";
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const { signin, loginFail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const submit = async () => {
    await signin(email, password);
    history.push("/");
  };

  return (
    <div className="login">
      <from>
        <h2>Đăng Nhập</h2>
        <div className="input-group">
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label for="email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label for="password">Mật khẩu</label>
        </div>
        <p className="login-fail">
          {loginFail ? "Đăng nhập thất bại!" : null}{" "}
        </p>
        <button onClick={submit}>Đăng nhập</button>
      </from>
    </div>
  );
};
export default LogIn;
