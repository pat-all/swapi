import React from "react";
import { NavLink } from "react-router-dom";

import "./index.scss";

const Navigation = ({ categoriesNames }) => {
  return (
    <nav className='navigation'>
      <div className="nav-item nav-link">
        <NavLink exact to="/" activeClassName="selected">
          home
        </NavLink>
      </div>

      {categoriesNames.map(name => (
        <div key={name} className="nav-item nav-link">
          <NavLink to={`/${name}`} activeClassName="selected">
            {name}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navigation