import classNames from "classnames";
import React, { useState } from "react";

interface propsType {
  currentLocal: string;
  searchText: string;
  inputHandler: Function;
  updateData: Function;
}

const SearchFilter = (data: propsType) => {
  const { currentLocal, searchText, inputHandler, updateData } = data || {};
  const [isSearch, setIsSearch] = useState(false);

  const updateStoreList = () => {
    setIsSearch(!isSearch);
    updateData(searchText);
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      updateStoreList();
    }
  };

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
            placeholder="지역명 입력"
            value={searchText}
            onChange={(e) => inputHandler(e.target.value)}
            onKeyUp={(e) => onKeyUpHandler(e)}
          />
          <button
            type="button"
            className="button__search"
            onClick={() => updateStoreList()}
          >
            <span className="for-a11y">검색</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
