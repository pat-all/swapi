import React from "react";
import {useSelector} from 'react-redux'

//styles
import "./index.scss";

//hooks
import useCategoryNames from "../../assests/hooks/useCategoryNames";
import useBurgerActive from "../../assests/hooks/useBurgerActive";

//components
import Search from "../search";
import Burger from "../../components/burger-button";
import Navigation from "../../components/navigation";

const Header = () => {
  const categoriesNames = useCategoryNames();
  const setActive = useBurgerActive()
  const isActive = useSelector(state => state.features.isBurgerActive)
  const toggleBurgerActive = () => {
    setActive(!isActive)
  }

  return (
    <header>
      <div className="header-section">
        <div className="header-logo nav-item">SWAPI</div>
        <div className="main-menu">
          <Navigation categoriesNames={categoriesNames} />
        </div>
        <div className="header-section header-search">
          <Search />
        </div>
      </div>
      <div className="small-menu">
        <Burger isActive={isActive} toggleActive={toggleBurgerActive} />
      </div>
    </header>
  );
};

export default React.memo(Header);
