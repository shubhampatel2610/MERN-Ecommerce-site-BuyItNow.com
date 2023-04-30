import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group custom-list">
          <h4>ADMIN PANEL</h4>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action menu-button"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action menu-button"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action menu-button"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/product"
            className="list-group-item list-group-item-action menu-button"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action menu-button"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
