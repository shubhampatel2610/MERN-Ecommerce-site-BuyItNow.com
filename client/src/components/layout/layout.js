import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

layout.defaultProps = {
  title: "BuyItNow - shop from us",
  description: "MERN full stack project",
  keywords: "HTML, CSS, JavaScript, Bootstrap, ReactJS, MongoDB, Mongoose",
  author: "Shubham Patel",
};

export default layout;
