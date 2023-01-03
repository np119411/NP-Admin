import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/orders/OrderMain";

const OrderScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain pageNumber={pageNumber} />
      </main>
    </>
  );
};

export default OrderScreen;
