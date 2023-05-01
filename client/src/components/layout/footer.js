import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">
        All Right {new Date().getFullYear()} © Me? Shubham Patel
      </h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/privacypolicy">Privacy Policy</Link>
      </p>
      <Link className="text-center footer-site">buyitnow.com 😉</Link>
    </div>
  );
};

export default footer;
