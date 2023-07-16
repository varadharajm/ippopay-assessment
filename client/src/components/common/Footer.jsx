import React from "react";

const Footer = () => {
  //   const link = "";
  //   const target = "_blank";

  return (
    <div className="navbar  justify-content-center text-white bg-dark">
      Copyright © <small>{new Date().getFullYear()} </small> varadharaj
      mahendran
      {"  "}
      {/* <a href={link} target={target}>
        varadharaj.com
      </a> */}
    </div>
  );
};

export default Footer;
