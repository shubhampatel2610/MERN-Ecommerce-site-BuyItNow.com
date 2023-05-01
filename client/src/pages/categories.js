import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All categories - BuyItNow"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="btn btstrp-buttons"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
