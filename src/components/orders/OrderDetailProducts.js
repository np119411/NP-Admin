import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  console.log(order);
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "30%" }}> Sản phẩm</th>
          <th style={{ width: "10%" }}> Size</th>
          <th style={{ width: "10%" }}> Màu</th>
          <th style={{ width: "15%" }}> Đơn giá</th>
          <th style={{ width: "15%" }}> Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng cộng
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{item.size}</td>
            <td>{item.color}</td>
            <td>{item.price/1000}.000</td>
            <td>{item.qty} </td>
            <td className="text-end"> {(item.qty * item.price).toLocaleString()} VNĐ</td>
          </tr>
        ))}

        <tr>
          <td colSpan="6">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng phụ:</dt> <dd>{order.itemsPrice.toLocaleString()} VNĐ</dd>
              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển:</dt> <dd>{order.shippingPrice.toLocaleString()} VNĐ</dd>
              </dl>
              <dl className="dlist">
                <dt>Thuế:</dt> <dd>{order.taxPrice.toLocaleString()} VNĐ</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng cộng:</dt>
                <dd>
                  <b className="h5">{order.totalPrice.toLocaleString()} VNĐ</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Thanh toán được thực hiện
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Không thể thanh toán
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
