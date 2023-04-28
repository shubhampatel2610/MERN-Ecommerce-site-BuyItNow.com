import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { UseAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = UseAuth();

  const getOrders = async () => {
    const { data } = await axios.get("/api/v1/auth/orders");
    setOrders(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="Dashboard - My orders - BuyItNow">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">My orders</h1>
            {orders.map((item, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">No. </td>
                        <td scope="col">Status: </td>
                        <td scope="col">Buyer: </td>
                        <td scope="col">Date: </td>
                        <td scope="col">Payment: </td>
                        <td scope="col">Quantity: </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{index + 1}</th>
                        <th>{item?.status}</th>
                        <th>{item?.buyers.name}</th>
                        <th>{moment(item?.createdAt).fromNow()}</th>
                        <th>
                          {item?.payment.success
                            ? " Success 🙂 "
                            : " Failed ☹ "}
                        </th>
                        <th>{item?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {item.products?.map((item, index) => (
                      <div className="row card flex-row m-4" key={item._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/get-product-photo/${item._id}`}
                            className="card-img-top m-2"
                            style={{ height: "80%", width: "80%" }}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p className="my-3">Name: {item.name}</p>
                          <p className="my-3">
                            Description: {item.description.substring(0, 40)}...
                          </p>
                          <p className="my-3">Price: {item.price} Rs.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
