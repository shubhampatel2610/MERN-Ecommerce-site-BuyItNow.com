import React from "react";
import Layout from "../components/layout/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  // initial details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product details - BuyItNow"}>
      <div className="row container mt-4">
        <div className="col-md-6 text-center">
          <img
            src={`/api/v1/product/get-product-photo/${product._id}`}
            className="card-img-top mt-5"
            style={{ height: "20rem", width: "20rem" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Product details</h2>
          <h5 className="my-4">Name: {product.name}</h5>
          <h5 className="my-4">Description: {product.description}</h5>
          <h5 className="my-4">Price: {product.price}</h5>
          <h5 className="my-4">Category: {product?.category?.name}</h5>
          <button class="btn btn-primary btstrp-buttons">ADD</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
