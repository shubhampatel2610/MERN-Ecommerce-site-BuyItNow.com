import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center custom-list">
        <div className="list-group">
          <h4>USER DASHBOARD</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action menu-button"
          >
            Manage profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action menu-button"
          >
            My orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
