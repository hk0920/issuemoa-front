import { Container, Accordion } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import ComponentTitle from "../common/ComponentTitle";
import * as InterViewApi from "../../api/learning";

interface Interview {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const Tech = () => {
  const [interview, setInterview] = useState<Interview[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("BACKEND");
  const fixedRef = useRef<HTMLDivElement>(null);

  const fetchData = async (category: string) => {
    try {
      let response = await InterViewApi.getInterviewList(category);

      if (response) {
        setInterview(response.list);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const renderContentWithImages = (content: string) => {
    const imageUrlMatches = content.match(
      /https:\/\/img1\.daumcdn\.net.*?\.png/g
    );

    if (content.includes("```")) {
      console.log(content.replace("```", "<code>"));
    }

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

    return (
      <p dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }} />
    );
  };

  window.addEventListener("scroll", (e) => {
    const titleOffsetTop = fixedRef.current?.offsetTop || 0;
    if (window.scrollY > titleOffsetTop) {
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
              <div className="box__accordion" key={idx}>
                <button
                  type="button"
                  className="button__accordion"
                  onClick={(e) => handleAccordion(e)}
                >
                  {data.question}
                </button>
                <div className="box__accordion-content">
                  {renderContentWithImages(data.answer)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Tech;
