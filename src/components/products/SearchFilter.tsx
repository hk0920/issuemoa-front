import classNames from "classnames";
import React, { useState } from "react";

interface propsType {
  currentLocal: string;
  searchText: string;
  inputHandler: Function;
}

const SearchFilter = (data: propsType) => {
  const { currentLocal, searchText, inputHandler } = data || {};
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="box__filter-search">
      <div className="box__inner">
        <p className="text__local">{currentLocal}</p>
        <div
          className={classNames(
            "box__search",
            isSearch && "box__search--active"
          )}
        >
          <input
            type="text"
            className="form__input"
            placeholder="지역명 입력 (구 포함)"
            value={searchText}
            onChange={(e) => inputHandler(e.target.value)}
          />
          <button
            type="button"
            className="button__search"
            onClick={() => setIsSearch(!isSearch)}
          >
            <span className="for-a11y">검색</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
