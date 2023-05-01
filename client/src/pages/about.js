import React from "react";
import Layout from "../components/layout/layout";

const About = () => {
  return (
    <Layout title={"About us - BuyItNow"}>
      <div className="row contactUs">
        <div className="col-md-6 ">
          <img
            src="../images/aboutUs.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            <p>
              👉🏻 Welcome to our BuyItNow! We are a team of dedicated
              professionals who are passionate about providing you with an
              exceptional online shopping experience.
            </p>
            <p>
              👉🏻 Our mission is to offer a wide range of high-quality products
              at competitive prices, and to ensure that your purchases are
              delivered to your doorstep in a timely and efficient manner.
              Whether you're looking for the latest fashion trends, cutting-edge
              electronics, or practical household items, we've got you covered.
            </p>
            <p>
              👉🏻 We pride ourselves on our commitment to customer satisfaction,
              and we're always here to help if you have any questions or
              concerns. Thank you for choosing us for all your online shopping
              needs!
            </p>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
