import {useDispatch} from 'react-redux'

import { setLeftSectionActive } from '../../redux-stuff/reducers/features-slice'

const useLeftActive = () => {
  const dispatch = useDispatch()
  return isActive => dispatch(setLeftSectionActive(isActive))
}

export default useLeftActive