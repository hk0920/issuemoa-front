import { useState } from "react";
import { Container } from "react-bootstrap";
import * as SubsidyApi from "../../api/subsidy";
import SubsidyList from "./SubsidyList";

const defaultCategory = [
  {
    id: 0,
    text: "지원 물품",
    categories: [
      {
        id: "0-1",
        text: "현금",
        code: ["현금"],
      },
      {
        id: "0-2",
        text: "현물",
        code: ["현물"],
      },
      {
        id: "0-3",
        text: "이용권",
        code: ["이용권"],
      },
      {
        id: "0-4",
        text: "서비스",
        code: ["서비스"],
      },
      {
        id: "0-5",
        text: "시설이용",
        code: ["시설이용"],
      },
      {
        id: "0-6",
        text: "의료지원",
        code: ["의료지원"],
      },
      {
        id: "0-7",
        text: "문화/여가지원",
        code: ["문화/여가지원"],
      },
      {
        id: "0-8",
        text: "기타",
        code: ["기타"],
      },
    ],
    searchType: "support",
  },
  {
    id: 1,
    text: "연령대",
    categories: [
      {
        id: "1-1",
        text: "아동",
        code: ["아동", "유아", "영유아", "영아"],
      },
      {
        id: "1-2",
        text: "청년",
        code: ["청소년", "청년"],
      },
      {
        id: "1-3",
        text: "임산부",
        code: ["임산", "임산부", "출산", "유산"],
      },
      {
        id: "1-4",
        text: "노인",
        code: ["노인", "어르신"],
      },
    ],
    searchType: "age",
  },
];
const Subsidy = () => {
  const [categories, setCategories] = useState(defaultCategory);
  const [searchType, setSearchType] = useState(null);
  const [supportList, setSupportList] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const getAgeData = async (search: string) => {
    try {
      let response;

      const searchData = {
        offset: offset,
        limit: limit,
        eligibleRecipients: search,
        serviceCategoryList: "",
        supportType: "",
      };
      response = await SubsidyApi.getServiceCategoryList(searchData);

      setSupportList(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSupportData = async (search: string) => {
    try {
      let response;

      const searchData = {
        offset: offset,
        limit: limit,
        eligibleRecipients: "",
        serviceCategoryList: "",
        supportType: search,
      };
      response = await SubsidyApi.getServiceCategoryList(searchData);
      setSupportList(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategory = (item: any) => {
    setTimeout(() => {
      if (item.categories) {
        setCategories(item.categories);
        setSearchType(item.searchType);
      } else {
        if (searchType === "age") {
          getAgeData(item.code);
        } else if (searchType === "support") {
          getSupportData(item.code);
        }
      }
    }, 100);
  };

  return (
    <Container className="page__sub page__subsidy">
      <div className="box__inner">
        <div className="box__component-title-wrap">
          <div className="box__component-title">
            <h2 className="text__h2">정부 보조금 지원</h2>
            <p className="text__sub">
              간단한 정보 입력으로 정부에서 지원사업 목록을 제공합니다.
            </p>
          </div>
        </div>
        {!supportList ? (
          <div className="box__category">
            {categories.map((item) => {
              return (
                <button
                  type="button"
                  className="button__category"
                  key={`category-${item.id}`}
                  onClick={() => {
                    handleCategory(item);
                  }}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        ) : (
          <SubsidyList data={supportList} />
        )}
      </div>
    </Container>
  );
};

export default Subsidy;
