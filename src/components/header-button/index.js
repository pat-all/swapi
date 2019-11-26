import React from 'react';

import './index.scss';

const HeaderButton = ({children}) => (
    <button className="header-item header-button">
      {children}
    </button>
);

export default HeaderButton;