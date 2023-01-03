import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import { createCategory } from "./../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      toast.success("Category Added", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setDescription("");
      setImage("");
    }
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, description, image));
  };

  return (
    <div className="col-md-12 col-lg-4">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Tên
          </label>
          <input
            type="text"
            placeholder="Nhập ở đây"
            className="form-control"
            id="category_name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Hình ảnh</label>
          <input className="form-control" type="file" />
        </div>
        <div className="mb-4">
          <label className="form-label">Mô tả</label>
          <textarea
            placeholder="Nhập ở đây"
            className="form-control"
            rows="7"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className="d-grid">
          <button className="btn btn-primary py-3">Tạo mới</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
