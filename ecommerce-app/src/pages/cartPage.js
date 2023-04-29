import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { UseCart } from "../context/cart";
import { UseAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = UseCart();
  const [auth, setAuth] = UseAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

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

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cartItems");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successful 🙂...");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
                key={item._id}
                style={{ borderColor: "#146C94" }}
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
                    className="btn btn-primary btstrp-buttons my-2"
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
            style={{ borderColor: "#146C94", height: "95vh" }}
          >
            <h3 className="text-center mt-2">CHECKOUT</h3>
            <hr style={{ color: "#146C94" }} />
            <h5>Total price: {totalPrice()} Rs.</h5>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5 className="my-3">
                    Current address: {auth?.user?.address}
                  </h5>
                  <button
                    className="btn btn-primary btstrp-buttons"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-primary btstrp-buttons"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btstrp-buttons"
                    onClick={() => {
                      navigate("/signin", { state: "/cart" });
                    }}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary btstrp-buttons"
                    onClick={handlePayment}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
