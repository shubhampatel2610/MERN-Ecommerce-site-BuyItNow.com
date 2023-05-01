import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/adminMenu";
import { UseAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = UseAuth();

  return (
    <Layout title="Admin Dashboard - BuyItNow">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-50 p-3">
              <h1>Admin name: {auth?.user?.name}</h1>
              <h5>Admin email: {auth?.user?.email}</h5>
              <h5>Admin contact: {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
