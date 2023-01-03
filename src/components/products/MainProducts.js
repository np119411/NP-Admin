import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../pagination";

const MainProducts = (props) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState(" ");
  const [searchField, setSearchField] = useState("");
  const [filter, setFilter] = useState("");

  const { pageNumber } = props;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  console.log(products);

  const filterSearch = products?.filter((products) => {
    return products.name.toLowerCase().includes(searchField.toLowerCase());
  });

  console.log(filterSearch);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, filter));
  }, [dispatch, successDelete, pageNumber, keyword, filter]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="form-control p-2"
                onChange={(e) => {
                  setSearchField(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-3 col-6 col-md-3">
              <select
                id="filter"
                value={filter}
                className="form-select"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="PRICE_HIGH_TO_LOW">Giá: từ cao đến thấp</option>
                <option value="PRICE_LOW_TO_HIGH">Giá: Thấp đến cao</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {filterSearch?.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination pages={pages} page={page} keyword="" screen="products" />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
