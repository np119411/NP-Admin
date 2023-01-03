import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from './Users'
import { listUser, deleteUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  console.log(users);


  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <section className="content-main">
    <div className="content-header">
      <h2 className="content-title">Người dùng</h2>
    </div>

    <div className="card mb-4 shadow-sm">
      <header className="card-header bg-white">
        <div className="row gx-3 py-3">
        </div>
      </header>
      <div className="card-body">
        <div className="table-responsive">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <Users users={users} />
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default UserComponent;
