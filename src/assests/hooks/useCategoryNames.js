import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { requestAll } from "../../redux-stuff/reducers/category-slice";

const useCategoryNames = () => {
  const categories = useSelector(state => state.categories);
  const connectionError = useSelector(
    state => state.errors.connectionError.isError
  );
  const categoriesNames = Object.keys(categories.entities);
  const dispatch = useDispatch();
  const { isFetching } = categories;

  useEffect(() => {
    if (!connectionError && !isFetching && categoriesNames.length === 0) {
      dispatch(requestAll());
    }
  });

  return categoriesNames
};

export default useCategoryNames;