import React from "react";

import "./index.scss";

const Burger = ({ isActive, toggleActive }) => (
  <div
    className={isActive ? "hamburger active-burger" : "hamburger"}
    onClick={toggleActive}
  >
    <span></span>
  </div>
);

export default Burger;
