import React from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/layout/userMenu";
import { UseAuth } from "../../context/auth";

const dashboard = () => {
  const [auth] = UseAuth();
  return (
    <Layout title={"User Dashboard - BuyItNow"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-50 p-3">
              <h1>{auth?.user?.name}</h1>
              <h5>{auth?.user?.email}</h5>
              <h5>{auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dashboard;
