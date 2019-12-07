import React from "react";
import {useSelector} from 'react-redux'

import "./index.scss";

import Search from '../search'
import Navigation from '../../components/navigation'

import useCategoryNames from "../../assests/hooks/useCategoryNames";
import useBurgerActive from "../../assests/hooks/useBurgerActive";

const SmallNav = () => {
  const categoriesNames = useCategoryNames();
  const setActive = useBurgerActive()
  const isActive = useSelector(state => state.features.isBurgerActive)
  const toggleActive = () => {
    setActive(!isActive)
  }


  return (
    <div className= "small-nav" onClick={toggleActive}>
      <Navigation categoriesNames={categoriesNames} />
      <div className="header-section small-search">
        <Search />
      </div>
    </div>
  );
};

export default SmallNav;
