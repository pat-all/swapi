import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import { setBurgerActive } from '../../redux-stuff/reducers/features-slice'

import "./index.scss";

const Burger = () => {
  const dispatch = useDispatch()
  const isActive = useSelector(state => state.features.isBurgerActive)
  const toggleBurgerActive = () => {
    dispatch(setBurgerActive({ isActive: !isActive}))
  }
  return (
    <div
      className={isActive ? "hamburger active-burger" : "hamburger"}
      onClick={toggleBurgerActive}
    >
      <span></span>
    </div>
  );
};

export default Burger;
