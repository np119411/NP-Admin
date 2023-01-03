import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategories,
  deleteCategory,
} from "../../Redux/Actions/CategoryActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { error: errorDelete, success: successDelete } = categoryDelete;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, successDelete]);

  const deletehandler = (id) => {
    if (window.confirm("Bạn có chắc chắc lựa chọn này??")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="col-md-12 col-lg-8">
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </td>
              <td>{category._id}</td>
              <td>
                <b>{category.name}</b>
              </td>
              <td>{category.description}</td>
              <td className="text-end">
                <div className="dropdown">
                  <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to={`/category/${category._id}/edit`}
                    >
                      Sửa
                    </Link>
                    <Link
                      className="dropdown-item text-danger"
                      to="#"
                      onClick={() => deletehandler(category._id)}
                    >
                      Xóa
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;