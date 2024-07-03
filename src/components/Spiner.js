import React from "react";
import darkLoading from "./darkLoding.gif";

const Spiner = () => {
  return (
    <div className="text-center my-3">
      <img src={darkLoading} alt="loading" />
    </div>
  );
};

export default Spiner;
