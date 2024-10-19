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

  const fetchData = async (type: number) => {
    let response = await getKeywordData(1);
    setKeywords(response);
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
      <Swiper
        className={"list__keyword"}
        modules={[Autoplay]}
        slidesPerView={"auto"}
        autoplay={true}
        direction={"vertical"}
        onClick={() => {
          setExpend(!isExpand);
          return false;
        }}
      >
        {keywords.map((item, index) => {
          return (
            <SwiperSlide key={item.id}>
              <span className="text__rank">{index + 1}</span>
              <span className="text"> {item.keyword}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="box__dimmed" onClick={(e) => setExpend(false)}></span>
    </div>
  );
};

export default KeywordFilter;
