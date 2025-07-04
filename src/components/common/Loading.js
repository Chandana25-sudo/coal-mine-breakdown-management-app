import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner spinner" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
