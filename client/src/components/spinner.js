import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "signin" }) => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-item-center"
        style={{ height: "100vh", paddingTop: "-10px" }}
      >
        <h1 className="text-center">Wait for sometime... </h1>
        <div
          className="spinner-border"
          role="status"
          style={{ margin: "0 auto" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
