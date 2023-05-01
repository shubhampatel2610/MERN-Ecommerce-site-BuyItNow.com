import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // toast.success("You are signed up successfull 🙂");
    try {
      const res = await axios.post("api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title="Sign Up - BuyItNow">
      <div className="form-container">
        <form className="sign-form" onSubmit={handleSubmit}>
          <h3 className="title">Sign Up</h3>
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
              required
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
          {/* <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm your password..."
            />
          </div> */}
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
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter a code word..."
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn button btn-primary">
            SignUp
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
