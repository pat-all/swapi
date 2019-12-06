import React from 'react';

import './index.scss';

const HeaderButton = ({children}) => {
  return(
    <button className="nav-item header-button">
      {children}
    </button>
);}

export default HeaderButton;