import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getKeywordData } from "../../api/board";

import "swiper/css";
import classNames from "classnames";

interface keywordProps {
  id: string;
  keyword: string;
  count: number;
  baseDateTime: string;
}

const KeywordFilter = () => {
  const [keywords, setKeywords] = useState<keywordProps[]>([]);
  const [isExpand, setExpend] = useState(false);
  const [selectKeyword, setSelectKeyword] = useState<keywordProps>();
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const fetchData = async (type: number) => {
    let response = await getKeywordData(1);
    setKeywords(response);
    setSelectKeyword(response[0]);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div
      className={classNames(
        "box__keyword-filter",
        isExpand && "box__keyword-filter--active"
      )}
    >
      <h2 className="for-a11y">인기 키워드</h2>
      {keywords && selectKeyword && (
        <button
          type="button"
          className="button__keyword"
          onClick={(e) => setExpend(true)}
        >
          <span className="text__rank">{selectIndex + 1}</span>
          <span className="text">{selectKeyword.keyword}</span>
        </button>
      )}
      <ul className="list__keyword">
        {keywords.map((item, index) => {
          return (
            <li key={item.id} className="list-item">
              <span className="text__rank">{index + 1}</span>
              <span className="text"> {item.keyword}</span>
            </li>
          );
        })}
      </ul>
      <span className="box__dimmed" onClick={(e) => setExpend(false)}></span>
    </div>
  );
};

export default KeywordFilter;
