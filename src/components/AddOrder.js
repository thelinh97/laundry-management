import React, { useState, useEffect } from "react";
import "./style/AddOrder.css";
import moment from "moment";
import { useFirebase } from "../contextApi/use-Firebase";

const AddOrder = () => {
  const timeMoment = moment().format("MMMM Do YYYY, h:mm a");
  const [time, setTime] = useState(timeMoment);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [mass, setMass] = useState("");
  const [money, setMoney] = useState(null);
  const { addOrder } = useFirebase();
  function formatCurrency(n, separate = ".") {
    var s = n.toString();
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, separate);
    return ret;
  }
  const total = () => {
    if (type === "clothes") {
      const totalMoney = mass * 20000;
      return formatCurrency(totalMoney);
    } else if (type === "blanket") {
      const totalMoney = mass * 25000;
      return formatCurrency(totalMoney);
    } else {
      return 0;
    }
  };
  const submit = () => {
    if (type !== "" && name !== "" && mass !== "" && phone !== "") {
      const order = {
        name: name,
        phone: phone,
        mass: mass,
        type: type,
        time: time,
      };
      if (order) {
        addOrder(order);
      }
    } else {
      alert("Thông tin chưa đầy đủ");
    }
  };
  useEffect(() => {
    const unSetInterVal = setInterval(() => {
      setTime(timeMoment);
    }, 1000);
    return () => clearInterval(unSetInterVal);
  }, []);

  useEffect(() => {
    setMoney(total());
  }, [type, mass]);

  return (
    <div className="login">
      <from style={{ height: "490px" }}>
        <h2>Nhập Thông Tin Khách Hàng</h2>
        <div className="input-group">
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label for="name">Tên khách</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            id="phone"
            name="phone"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label for="phone">Số điện thoại</label>
        </div>
        <div className="select-group">
          <label for="type">Loại: </label>
          <select
            name="type"
            id="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">Chọn</option>
            <option value="clothes">Quần áo</option>
            <option value="blanket">Chăn gối</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="number"
            id="mass"
            name="mass"
            required
            onChange={(e) => {
              setMass(e.target.value);
            }}
          />
          <label for="mass">Số kg</label>
        </div>
        <p style={{ fontSize: "12px" }}>{time}</p>
        <p style={{ margin: "25px 0 10px" }}>
          Thanh toán:
          <br />
          {money}vnđ
        </p>
        <button onClick={submit}>Lưu thông tin</button>
      </from>
    </div>
  );
};
export default AddOrder;
