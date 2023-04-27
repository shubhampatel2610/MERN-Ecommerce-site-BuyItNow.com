import React from "react";
import Layout from "../components/layout/layout";
import { UseCart } from "../context/cart";
import { UseAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = UseCart();
  const [auth, setAuth] = UseAuth();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cartItems", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mb-1 p-2">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h5 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart 🙂... ${
                    auth?.token ? "" : "Please login to checkout 😐..."
                  }`
                : "Your cart is empty ☹..."}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((item) => (
              <div
                className="row card flex-row m-4"
                style={{ borderColor: "#da0037" }}
              >
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/get-product-photo/${item._id}`}
                    className="card-img-top m-2"
                    style={{ height: "90%", width: "90%" }}
                    alt={item.name}
                  />
                </div>
                <div className="col-md-8">
                  <p className="my-3">Name: {item.name}</p>
                  <p className="my-3">
                    Description: {item.description.substring(0, 40)}...
                  </p>
                  <p className="my-3">Price: {item.price} Rs.</p>
                  <button
                    className="btn btstrp-buttons my-2"
                    style={{ color: "white" }}
                    onClick={() => removeCartItem(item._id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="col-md-4 my-4 card"
            style={{ borderColor: "#da0037", height: "70vh" }}
          >
            <h3 className="text-center mt-2">CHECKOUT</h3>
            <hr style={{ color: "#da0037" }} />
            <h5>Total price: {totalPrice()} Rs.</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
