import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HeaderButton from "../header-button";

import "./index.scss";

const Search = () => {
  const [query, setSquery] = useState("");
  const { pathname } = useLocation();
  const category = pathname.split("/")[1];
  const inputChange = e => {
    const newValue = e.target.value;
    setSquery(newValue);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={e => {
          inputChange(e);
        }}
      />
      <HeaderButton>
        <Link to={`/${category}/?search=${query}`}>Search</Link>
      </HeaderButton>
    </div>
  );
};

export default Search;
