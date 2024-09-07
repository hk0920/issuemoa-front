import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Cookies, useCookies } from "react-cookie";
import classNames from "classnames";
import * as InterViewApi from "../../api/learning";
import ComponentTitle from "../common/ComponentTitle";
import Dialog from "../modal/dialog";
import renderCode from "./renderCode";

import "../../styles/tech.scss";

interface Interview {
  id: number;
  category: string;
  question: string;
  answer: string;
  favoritesYn: string;
}

const Tech = () => {
  const cookies = new Cookies();
  const [cookie, setCookie, removeCookie] = useCookies([
    "access_token",
    "tech_scrollY",
    "tech_activeMenu",
    "tech_accordionActive",
    "tech_accordionIndex",
  ]);
  const [isLoad, setIsLoad] = useState(false);
  const [interview, setInterview] = useState<Interview[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    cookie.tech_activeMenu ? cookie.tech_activeMenu : "BACKEND"
  );
  const fixedRef = useRef<HTMLDivElement>(null);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (category: string) => {
    try {
      let response = await InterViewApi.getInterviewList(category);

      if (response) {
        const list = response.list.map((item: Interview) => ({
          ...item,
          favoritesYn: response.favoritesId.includes(item.id) ? "Y" : "N",
        }));
        setInterview(list);
        setIsLoad(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, cookie.tech_scrollY);
  }, [isLoad]);

  useEffect(() => {
    fetchData(selectedCategory);
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    cookies.set("tech_activeMenu", event.target.value);
    cookies.set("tech_accordionActive", false);
    cookies.set("tech_scrollY", 0);
  };

  window.addEventListener("scroll", (e) => {
    const titleOffsetTop = fixedRef.current?.offsetTop || 0;
    if (window.scrollY >= titleOffsetTop) {
      fixedRef.current?.classList.add("fixed");
    } else {
      fixedRef.current?.classList.remove("fixed");
    }
  });

  const handleAccordion = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const targetItemGroup = e.currentTarget.closest(
      ".box__accordion-group"
    ) as HTMLDivElement;
    const targetItem = e.currentTarget.closest(
      ".box__accordion"
    ) as HTMLDivElement;

    cookies.set("tech_accordionIndex", id);
    if (!targetItem.classList.contains("box__accordion--active")) {
      targetItemGroup
        .querySelectorAll(".box__accordion")
        .forEach((item, idx) => {
          item.classList.remove("box__accordion--active");
        });
      targetItem.classList.add("box__accordion--active");
      cookies.set("tech_accordionActive", true);
    } else {
      targetItem.classList.remove("box__accordion--active");
      cookies.set("tech_accordionActive", false);
    }

    setTimeout(() => {
      const targetOffsetTop = targetItem.offsetTop;
      const fixeTopHeight = fixedRef.current
        ? fixedRef.current?.clientHeight
        : 0;

      const scrollY =
        window.scrollY < fixeTopHeight
          ? targetOffsetTop - 75
          : targetOffsetTop - fixeTopHeight - 65;

      window.scrollTo(0, scrollY);
      cookies.set("tech_scrollY", scrollY);
    }, 650);
  };

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    if (!cookie.access_token) {
      setIsAlertModal(true);
    } else {
      setIsAlertModal(false);

      const target = e.currentTarget;
      if (target.classList.contains("button__favorite--active")) {
        target.classList.remove("button__favorite--active");
        InterViewApi.saveFavoriteInterview(id, "N");
      } else {
        target.classList.add("button__favorite--active");
        InterViewApi.saveFavoriteInterview(id, "Y");
      }
    }
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  const handleConfirmModal = () => {
    setIsAlertModal(false);
    navigate("/login");
  };

  return (
    <Container className="page__sub page__tech">
      <div className="box__inner">
        <div className="box__component-title-wrap" ref={fixedRef}>
          <ComponentTitle
            title={"기술용어"}
            subTitle={"IT 기술 용어를 쉽고 간단하게 배워봅시다"}
          />
          <div className="box__select">
            <select
              className="form__select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="BACKEND">백앤드</option>
              <option value="FRONT">프론트</option>
              <option value="AGDS">알고리즘&자료구조</option>
              <option value="OS">운영체제</option>
              <option value="NETWORK">네트워크</option>
              <option value="DATABASE">데이터베이스</option>
              <option value="CRYPTO">암호학</option>
              <option value="SECURITY">보안</option>
            </select>
          </div>
        </div>
        <div className="box__accordion-group">
          {interview.map((data, idx) => {
            return (
              <div
                className={classNames(
                  "box__accordion",
                  cookie.tech_accordionIndex === data.id &&
                    cookie.tech_accordionActive &&
                    "box__accordion--active"
                )}
                key={data.id}
              >
                <div className="box__accordion-title">
                  <button
                    type="button"
                    className={classNames(`button__favorite ${data.id}`, {
                      "button__favorite--active": data.favoritesYn === "Y",
                    })}
                    onClick={(e) => handleFavorite(e, data.id)}
                  >
                    <span className="for-a11y">좋아요</span>
                  </button>
                  <button
                    type="button"
                    className="button__accordion"
                    onClick={(e) => handleAccordion(e, data.id)}
                  >
                    {data.question}
                  </button>
                </div>
                <div className="box__accordion-content">
                  {renderCode(data.answer)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog
        isOpen={isAlertModal}
        onClose={closeAlertModal}
        onConfirm={handleConfirmModal}
        title={"준비 중입니다."}
        context={"로그인 후 이용 가능합니다."}
        buttonText={"로그인"}
      />
    </Container>
  );
};

export default Tech;
