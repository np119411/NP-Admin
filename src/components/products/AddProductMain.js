import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import { listCategories } from "./../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState([
    {
      value: "",
      lable: "",
    },
  ]);
  const [color, setColor] = useState([
    {
      value: "",
      lable: "",
    },
  ]);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
    if (product) {
      toast.success("Sản phẩm đã được thêm", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setCategory("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setSize([]);
      setColor([]);
      setPrice(0);
      setDescription("");
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        category,
        price,
        description,
        image,
        countInStock,
        size,
        color
      )
    );
  };

  const isFileImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    const isImage = isFileImage(file);
    if (isImage) {
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_CODE);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
          formData
        )
        .then((response) => {
          setImage(response.data.url);
        });
    } else {
        toast.error('Vui lòng chọn file hình ảnh', ToastObjects);
    }
  };

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
                    <h4 className="text-primary">Thêm sản phẩm</h4>
                  </div>
                </div>
                <div className="card-body">
                  {error && (
                    <Message variant="alert-danger">
                      Xin kiểm tra lại thông tin đã nhập
                    </Message>
                  )}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      placeholder="Vui lòng nhập tên sản phẩm "
                      className="form-control"
                      id="product_title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Danh mục sản phẩm
                    </label>
                    <select
                      id="product_category"
                      placeholder="Chọn danh mục sản phẩm "
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option> Chọn danh mục</option>
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
                      Tình trạng:
                    </label>
                    <Select
                      isMulti
                      name="product_size"
                      placeholder="Chọn tình trạng"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={[
                        {
                          value: "please choose condition",
                          label: "Chọn tình trạng",
                        },
                        { value: "new", label: "Mới" },
                        { value: "likeNew", label: "Như mới" },
                        { value: "old", label: "Cũ" },
                      ]}
                      onChange={(selectedOption) => {
                        const arraySize = [];
                        selectedOption.map(({ value, label }) =>
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
                      name="product_color"
                      placeholder="Chọn Loại sách"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={[
                        {
                          value: "please choose type",
                          label: "Chọn Loại sách",
                        },
                        { value: "english", label: "Tiếng anh" },
                        { value: "vietnamese", label: "Tiếng Viêt" },
                      ]}
                      onChange={(selectedOption) => {
                        const arrayColor = [];
                        selectedOption.map(({ value, label }) =>
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
                      placeholder="Vui lòng nhập giá sản phẩm ..."
                      className="form-control"
                      id="product_price"
                      min="0"
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
                      min="0"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Vui lòng nhập mô tả sản phẩm"
                      className="form-control"
                      rows="7"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập URL hình ảnh"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                    />
                    <input
                      className="form-control mt-3"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
