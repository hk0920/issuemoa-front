import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ComponentTitle from "../common/ComponentTitle";
import * as InterViewApi from "../../api/learning";
import Dialog from "../modal/dialog";

interface Interview {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const Tech = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [interview, setInterview] = useState<Interview[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("BACKEND");
  const fixedRef = useRef<HTMLDivElement>(null);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([
    "access_token",
    "tech_scrollY",
  ]);
  const navigate = useNavigate();

  const fetchData = async (category: string) => {
    try {
      let response = await InterViewApi.getInterviewList(category);

      if (response) {
        setInterview(response.list);
        setIsLoad(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);

    if (isLoad) {
      console.log("scrollY->", cookie.tech_scrollY);
      window.scrollTo(0, cookie.tech_scrollY);
    }
  }, [selectedCategory, isLoad]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const renderContentWithImages = (content: string) => {
    const imageUrlMatches = content.match(
      /https:\/\/img1\.daumcdn\.net.*?\.png/g
    );

    if (imageUrlMatches && imageUrlMatches.length > 0) {
      const images = imageUrlMatches.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ));

      const lastImageIndex = imageUrlMatches.length - 1;
      const textWithoutImages = content
        .split(imageUrlMatches[lastImageIndex])
        .join("");

      return (
        <div>
          {images}
          <p
            dangerouslySetInnerHTML={{
              __html: textWithoutImages.replace(/\n/g, "<br>"),
            }}
          />
        </div>
      );
    }

    if (content.includes("```")) {
      const contentArray = content.split("``");
      const context = contentArray.map((item, idx) => {
        let result = item.includes("`java")
          ? item.replace("`java", "<code class='box__code'>") + "</code>"
          : item;

        if (result.includes("// ")) {
          const resultText = result
            .substring(result.indexOf("// "))
            .split("\n");
          resultText.map((text, q) => {
            if (!text.includes("// ")) return false;
            let commentText = text.substring(
              text.indexOf("// ", text.indexOf("\n"))
            );
            result = result.replace(
              commentText,
              "<span class='text__comment'>" + commentText + "</span>"
            );
          });
        }

        return result;
      });

      return (
        <>
          {context.map((item, idx) => {
            return (
              <div
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: item
                    .toString()
                    .replaceAll(/\n/g, "<br />")
                    .replaceAll("   ", "&nbsp;&nbsp;"),
                }}
              ></div>
            );
          })}
        </>
      );
    } else {
      return (
        <p
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
        />
      );
    }
  };

  window.addEventListener("scroll", (e) => {
    const titleOffsetTop = fixedRef.current?.offsetTop || 0;
    console.log(titleOffsetTop);
    if (window.scrollY >= titleOffsetTop) {
      fixedRef.current?.classList.add("fixed");
    } else {
      fixedRef.current?.classList.remove("fixed");
    }
  });

  const handleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetItemGroup = e.currentTarget.closest(
      ".box__accordion-group"
    ) as HTMLDivElement;
    const targetItem = e.currentTarget.closest(
      ".box__accordion"
    ) as HTMLDivElement;

    const fixeTopHeight = fixedRef.current ? fixedRef.current?.clientHeight : 0;
    if (!targetItem.classList.contains("box__accordion--active")) {
      targetItemGroup
        .querySelectorAll(".box__accordion")
        .forEach((item, idx) => {
          item.classList.remove("box__accordion--active");
        });
      targetItem.classList.add("box__accordion--active");
    } else {
      targetItem.classList.remove("box__accordion--active");
    }

    setTimeout(() => {
      const targetOffsetTop = targetItem.offsetTop;
      const scrollY = targetOffsetTop - fixeTopHeight - 60;
      window.scrollTo(0, scrollY);
    }, 600);
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
              <div className="box__accordion" key={data.id}>
                <div className="box__accordion-title">
                  <button
                    type="button"
                    className="button__favorite"
                    onClick={(e) => handleFavorite(e, data.id)}
                  >
                    <span className="for-a11y">좋아요</span>
                  </button>
                  <button
                    type="button"
                    className="button__accordion"
                    onClick={(e) => handleAccordion(e)}
                  >
                    {data.question}
                  </button>
                </div>
                <div className="box__accordion-content">
                  {renderContentWithImages(data.answer)}
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
