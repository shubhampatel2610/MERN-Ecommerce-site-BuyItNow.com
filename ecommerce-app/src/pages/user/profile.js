import React from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "../../components/layout/layout";

const Profile = () => {
  return (
    <Layout title="Dashboard - My orders - BuyItNow">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
