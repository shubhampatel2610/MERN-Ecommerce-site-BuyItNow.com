import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/adminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // get particular product
  const getParticularProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParticularProduct();
    // eslint-disable-next-line
  }, []);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories ☹...");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // handle update function
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated successfully 🙂...");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ☹...");
    }
  };

  // handle delete function
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Do you want to delete the following product?"
      );

      if (!answer) return;

      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully 🙂...");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ☹...");
    }
  };

  return (
    <Layout title="Dashboard - Create Product - BuyItNow">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 custom-formfield"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3 ">
                <label className="btn btn-outline-danger col-md-12 font-weight-bold">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(event) => {
                      setPhoto(event.target.files[0]);
                    }}
                    hidden
                  ></input>
                </label>
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/get-product-photo/${id}`}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name of product..."
                  className="form-control custom-formfield"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></input>
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter description of product..."
                  className="form-control form-label custom-formfield"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter price of product..."
                  className="form-control custom-formfield"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                ></input>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity of product..."
                  className="form-control custom-formfield"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                ></input>
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3 custom-formfield"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>

              <div>
                <button
                  className="btn btn-primary btstrp-buttons"
                  onClick={handleUpdate}
                >
                  Update
                </button>

                <button
                  className="btn btn-outline-danger m-3"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
