import React, { useEffect } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCategoryItemIfNeeded } from "../../assests/config/data-fetch-service";

import {
  lowDashReplacer,
  cutUrl,
  searchInCategory,
  replaceUrl,
  isUrlCheck
} from "../../assests/config/swapi.config";

import "./index.scss";

const RightSection = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { category: categoryName } = useParams();
  const { entities, isFetching } = useSelector(state => state.categories);
  const { connectionError } = useSelector(state => state.errors);
  const category = entities[categoryName];

  let itemKeys = [];
  let items = [];
  let item = null;

  useEffect(() => {
    if (!isFetching && !connectionError.isError && category && !item) {
      dispatch(fetchCategoryItemIfNeeded(category, categoryName, url));
    }
  });

  if (!isFetching && category && url && !item) {
    items = searchInCategory(category, { fieldName: "url", fieldValue: url });
    item = items.length > 0 ? items[0] : null;
    itemKeys = item ? Object.keys(item) : [];
  }
  return (
    <section className="right-section">
      <div className="data-container">
        {item &&
          itemKeys.length > 0 &&
          itemKeys.map((key, i) => {
            const style = {
              background: i % 2 === 0 ? "#efebe9" : "transparent"
            };
            return (
              <div className="row" key={i} style={style}>
                <div className="left-cell">{lowDashReplacer(key)}</div>
                <div className="right-cell">
                  {Array.isArray(item[key]) ? (
                    item[key].map((data, i) => (
                      <React.Fragment key={i}>
                        <Link to={cutUrl(data)}>
                          {replaceUrl(entities, data)
                            ? replaceUrl(entities, data)
                            : cutUrl(data)}
                        </Link>{" "}
                        <br></br>
                      </React.Fragment>
                    ))
                  ) : isUrlCheck(item[key]) && cutUrl(item[key]) ? (
                    <Link to={cutUrl(item[key])}>
                      {key !== "url" && replaceUrl(entities, item[key])
                        ? replaceUrl(entities, item[key])
                        : cutUrl(item[key])}
                    </Link>
                  ) : (
                    item[key]
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default RightSection;
