import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/Actions/userActions";
import moment from "moment";

const Users = (props) => {
  const { users } = props;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Bạn có chắc chắc lựa chọn này??")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Chức vụ</th>
          <th scope="col">Đã cập nhật</th>
          <th scope="col" className="text-end">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>
              <b>{user._id}</b>
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Admin" : "User"}</td>
            <td>{moment(user.updatedAt).format("MMM Do YY")}</td>
            <td className="d-flex justify-content-end align-item-center">
              <button 
                className="btn-primary" 
                onClick={() => {deleteHandler(user._id)}}
              >
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
