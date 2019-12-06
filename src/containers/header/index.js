import React from "react";

//styles
import "./index.scss";

//hooks
import useCategoryNames from "../../assests/hooks/useCategoryNames";

//components
import Search from "../search";
import Burger from "../../components/burger-button";
import Navigation from "../../components/navigation";

const Header = () => {
  const categoriesNames = useCategoryNames();

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
        <Burger />
      </div>
    </header>
  );
};

export default React.memo(Header);
