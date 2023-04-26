import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // toast.success("You are signed in successfull 🙂");
    try {
      const res = await axios.post("api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ☹!");
    }
  };

  return (
    <Layout title="Forgot Password - BuyItNow">
      <div className="form-container">
        <form className="sign-form" onSubmit={handleSubmit}>
          <h3 className="title">Reset password</h3>
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
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your code word..."
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your new password..."
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn button btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
