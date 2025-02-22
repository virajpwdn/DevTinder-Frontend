import React from "react";

const Toast = ({message}) => {
  return (
    <div className="toast toast-center">
      <div className="alert alert-info">
        <span>New mail arrived.</span>
      </div>
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
