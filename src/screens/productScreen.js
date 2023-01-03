import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";

const ProductScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts pageNumber={pageNumber}/>
      </main>
    </>
  );
};

export default ProductScreen;
