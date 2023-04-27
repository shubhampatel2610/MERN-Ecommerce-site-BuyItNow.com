import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/userMenu";
import Layout from "../../components/layout/layout";
import { UseAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = UseAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setEmail(email);
    setName(name);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully 🙂...");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ☹!");
    }
  };

  return (
    <Layout title="My profile - BuyItNow">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="form-container"
              style={{ backgroundColor: "white" }}
            >
              <form onSubmit={handleSubmit}>
                <h3 className="title">Manage profile</h3>
                <div className="mb-3 form-field">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter your phone number..."
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter your address..."
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn button btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
