import {useDispatch} from "react-redux"

import {setBurgerActive} from '../../redux-stuff/reducers/features-slice'

const useBurgerActive = () => {
  const dispatch = useDispatch()
  return isActive => dispatch(setBurgerActive(isActive))
}

export default useBurgerActive