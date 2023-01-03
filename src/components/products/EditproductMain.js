import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoriesloading,
    error: categorieserror,
    categories,
  } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Sản phẩm đã được cập nhật", ToastObjects);
    } else {
      dispatch(listCategories());
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        category,
        price,
        description,
        image,
        countInStock,
        size,
        color
      })
    );
  };

  console.log(product);

  const values = [
    {
      value : 'yellow',
      label : 'Vàng'
    },
    {
      value : 'white',
      label : 'Trắng'
    },
]

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products/page/1" className="btn btn-danger text-white">
              Đi đến sản phẩm
            </Link>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <div className="d-flex justify-content-center">
                    <h4 className="text-primary">Cập nhật sản phẩm</h4>
                  </div>
                </div>
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập ở đây"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_category"
                          className="form-label"
                        >
                          Danh mục sản phẩm
                        </label>
                        <select
                          id="product_category"
                          className="form-control"
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_size"
                          className="form-label"
                          multiple
                        >
                          Size:
                        </label>
                        <Select
                          isMulti
                          defaultValue={product.size}
                          name="product_size"
                          placeholder="Chọn tình trạng"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          options={[
                              { value: "please choose condition", label: "Chọn tình trạng" },
                              { value: "new", label: "Mới" },
                              { value: "likeNew", label: "Như mới" },
                              { value: "old", label: "Cũ" },
                          ]}
                          onChange={(selectedOption) => {
                            const arraySize = [];
                            selectedOption.map(
                              ({ value, label }) =>
                              arraySize.push({
                                  value: value,
                                  label: label,
                                })
                            );
                            setSize(arraySize);
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_color"
                          className="form-label"
                          multiple
                        >
                          Loại sách:
                        </label>
                        <Select
                          isMulti
                          defaultValue={product.color}
                          name="product_color"
                          placeholder="Chọn Loại sách"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          options={[
                              { value: "please choose type", label: "Chọn Loại sách" },
                              { value: "english", label: "Tiếng anh" },
                              { value: "vietnamese", label: "Tiếng Viêt" },
                          ]}

                          onChange={(selectedOption) => {
                            const arrayColor = [];
                            selectedOption.map(
                              ({ value, label }) =>
                              arrayColor.push({
                                  value: value,
                                  label: label,
                                })
                            );
                            setColor(arrayColor);
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Nhập ở đây"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số lượng trong kho
                        </label>
                        <input
                          type="number"
                          placeholder="Nhập ở đây"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
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
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
