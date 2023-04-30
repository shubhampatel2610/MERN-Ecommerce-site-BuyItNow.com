import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/adminMenu";
import Layout from "../../components/layout/layout";
import toast from "react-hot-toast";
import moment from "moment";
import { UseAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    " Not process ",
    " Processing ",
    " Shipped ",
    " Despatched ",
    " Arriving shortly ",
    " Delievered ",
    " Canceled ",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = UseAuth();

  const getOrders = async () => {
    const { data } = await axios.get("/api/v1/auth/all-orders");
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin Orders - BuyItNow"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Customers' orders</h1>
            {orders.map((item, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No. </th>
                        <th scope="col">Status: </th>
                        <th scope="col">Buyer: </th>
                        <th scope="col">Date: </th>
                        <th scope="col">Payment: </th>
                        <th scope="col">Quantity: </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(item._id, value)}
                            defaultValue={orders?.status}
                            style={{ width: "100px" }}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{item?.buyers.name}</td>
                        <td>{moment(item?.createdAt).fromNow()}</td>
                        <td>
                          {item?.payment.success
                            ? " Success 🙂 "
                            : " Failed ☹ "}
                        </td>
                        <td>{item?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <div className="container">
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
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
