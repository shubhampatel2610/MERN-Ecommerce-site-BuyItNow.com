import React from "react";
import Layout from "../components/layout/layout";
import { UseSearch } from "../context/search";

const SearchPage = () => {
  const [values, setValues] = UseSearch();
  return (
    <Layout title={"Search results - BuyItNow"}>
      <div className="container">
        <div className="text-center">
          <h1>Search results:</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found ☹..."
              : `${values?.results.length} products found 🙂...`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((product) => (
              <div className="card m-2 mx-4" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/get-product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 25)}...
                  </p>
                  <p className="card-text">{product.price} Rs.</p>
                  <a class="float-start product-link me-5 ">Read more...</a>
                  <button class="btn btn-primary btstrp-buttons">ADD</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
