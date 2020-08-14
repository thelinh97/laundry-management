import React from "react";
import "./style/SeeOrder.css";
import { useFirebase } from "../contextApi/use-Firebase";

export default function SeeOrder() {
  const { data } = useFirebase();
  console.log(data);
  const dataTable =
    data !== []
      ? data.map((item) => {
          return (
            <tr>
              <td>{item[1].name}</td>
              <td>{item[0]}</td>
              <td>{item[1].type}</td>
              <td>{item[1].mass}</td>
              <td>{item[1].money}vnđ</td>
            </tr>
          );
        })
      : null;
  return (
    <div className="center">
      <table className="table">
        <tr>
          <th>Tên</th>
          <th>Số ĐT</th>
          <th>Loại</th>
          <th>Số Kg</th>
          <th>Thanh toán</th>
        </tr>
        {dataTable}
      </table>
    </div>
  );
}
