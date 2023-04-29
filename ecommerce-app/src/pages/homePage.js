import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/cart";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = UseCart();

  const navigate = useNavigate();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (isChecked, id) => {
    let all = [...checked];
    if (isChecked) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  // filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All products with best offers - BuyItNow"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center mt-3 ms-2">Filter by categories:</h4>
          <div className="d-flex flex-column ms-4">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(event) => {
                  handleFilter(event.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-3 ms-2">Filter by price range:</h4>
          <div className="d-flex flex-column ms-4">
            <Radio.Group
              onChange={(event) => {
                setRadio(event.target.value);
              }}
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>;
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-primary btn-sm btstrp-buttons mx-auto mt-4"
              style={{ width: "100px" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products:</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <div
                className="card m-2 mx-4"
                style={{ width: "18rem", borderColor: "#146C94" }}
              >
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
                  <a
                    onClick={() => navigate(`/product/${product.slug}`)}
                    class="float-start product-link me-5 "
                  >
                    Read more...
                  </a>
                  <button
                    class="btn btn-primary btstrp-buttons"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cartItems",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item added to cart 🙂...");
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-primary btstrp-buttons"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load more..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
