/**
 * got this code from @link https://www.jayfreestone.com/writing/react-portals-with-hooks/
 */

import React from 'react'
import { createPortal } from 'react-dom';

import usePortal from '../../assests/hooks/usePortal';

import './index.scss'

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(
    <div className='modal'> {/*this <div> added for modal styles */}
      {children}
    </div>,
    target,
  );
};

export default Portal;
