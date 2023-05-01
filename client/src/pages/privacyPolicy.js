import React from "react";
import Layout from "../components/layout/layout";

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy and Policy - BuyItNow"}>
      <div className="row contactUs">
        <div className="col-md-6 ">
          <img
            src="../images/privacyPolicy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            👉🏻 We are committed to protecting your privacy and the security of
            your personal information. We collect certain information about you
            in order to process your orders and provide you with a personalized
            shopping experience. This may include your name, address, email
            address, phone number, and payment information. We do not sell or
            rent your personal information to any third parties.
          </p>
          <p>
            👉🏻 We use your information to process your orders and to communicate
            with you about your purchases. We may also use your information to
            send you promotional offers or information about our products and
            services, but you can opt out of these communications at any time.
          </p>
          <p>
            👉🏻 We take reasonable measures to ensure the security of your
            personal information, including using industry-standard encryption
            technologies to protect your payment information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
