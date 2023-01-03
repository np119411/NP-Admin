import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê sản phẩm</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-tbzgl/embed/charts?id=639ee036-c2dd-4934-8ba4-35046d1fe510&maxDataAge=3600&theme=light&autoRefresh=true">

          </iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
