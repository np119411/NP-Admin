import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { orders } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng cộng</th>
          <th scope="col">Thanh toán</th>
          <th scope="col">Ngày</th>
          <th>Trạng thái</th>
          <th scope="col" className="text-end">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user?.name}</b>
            </td>
            <td>{order.user?.email}</td>
            <td>{(order.totalPrice.toLocaleString())} VNĐ</td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Thanh toán vào {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Không thể thanh toán
                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Đã giao hàng</span>
              ) : (
                <span className="badge btn-dark">Đang xử lý</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Orders;
