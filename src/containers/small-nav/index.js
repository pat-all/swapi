import React from "react";

import "./index.scss";

import Search from '../search'
import Navigation from '../../components/navigation'

import useCategoryNames from "../../assests/hooks/useCategoryNames";

const SmallNav = () => {
  const categoriesNames = useCategoryNames();

  return (
    <div className="small-nav">
      <Navigation categoriesNames={categoriesNames} />
      <div className="header-section small-search">
        <Search />
      </div>
    </div>
  );
};

export default SmallNav;
