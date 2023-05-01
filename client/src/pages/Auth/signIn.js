import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAuth } from "../../context/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = UseAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // toast.success("You are signed in successfull 🙂");
    try {
      const res = await axios.post("api/v1/auth/signin", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ☹!");
    }
  };

  return (
    <Layout title="Sign In - BuyItNow">
      <div className="form-container">
        <form className="sign-form" onSubmit={handleSubmit}>
          <h3 className="title">Sign In</h3>
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
              required
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
              required
            />
          </div>
          <a
            href=""
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot password?
          </a>
          <p></p>
          <button type="submit" className="btn button btn-primary">
            SignIn
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
