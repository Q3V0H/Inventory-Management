import React from "react";
import CartItems from "../../../_components/tables/CartItems";

const Cart = () => {
  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CartItems />
      </div>
    </div>
  );
};

export default Cart;
