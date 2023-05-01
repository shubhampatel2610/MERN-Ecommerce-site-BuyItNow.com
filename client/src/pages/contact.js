import React from "react";
import Layout from "../components/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us - BuyItNow"}>
      <div className="row contactUs">
        <div className="col-md-6 ">
          <img
            src="../images/contactUs.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center contact-button">
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            Have query? Need information about products? Feel free to contact us
            anytime 24x7. Thanks 🙂.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@buyitnow.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-345-678-9
          </p>
          <p className="mt-3">
            <BiSupport /> : 7777-7777-7777 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
