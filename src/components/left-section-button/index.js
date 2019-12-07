import React from "react";

import "./index.scss";

const LeftButton = ({ isActive, toggleActive }) => (
  <div
    className={isActive ? "swipe-button active" : "swipe-button"}
    onClick={toggleActive}
  >
    <span></span>
  </div>
);

export default LeftButton;
