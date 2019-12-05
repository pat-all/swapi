import React from 'react';

import './index.scss';

const HeaderButton = ({children}) => {
  return(
    <button className="header-item header-button">
      {children}
    </button>
);}

export default HeaderButton;