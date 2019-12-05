import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HeaderButton from "../../components/header-button";

import "./index.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const category = pathname.split("/")[1];
  const isDisabled = pathname.length === 1;
  return (
    <div className="search">
      <input
        disabled={isDisabled}
        type="text"
        placeholder="Search"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      {isDisabled ? (
        <HeaderButton>Search</HeaderButton>
      ) : (
        <HeaderButton>
          <Link to={`/${category}/?search=${query}`}>Search</Link>
        </HeaderButton>
      )}
    </div>
  );
};

export default Search;
