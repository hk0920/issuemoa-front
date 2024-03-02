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
    const targetItem = e.currentTarget.closest(
      ".accordion-item"
    ) as HTMLDivElement;
    const targetOffsetTop = e.currentTarget.offsetTop;
    const targetChildren = targetItem.querySelector(".accordion-collapse");
    const targetChildrenHeight = targetChildren?.classList.contains("show")
      ? targetChildren?.clientHeight
      : 0;

    const fixeTopHeight = fixedRef.current ? fixedRef.current?.clientHeight : 0;

    setTimeout(() => {
      if (targetChildren?.classList.contains("show")) {
        const scrollY =
          targetOffsetTop - targetChildrenHeight - fixeTopHeight - 60;
        window.scrollTo(0, scrollY);
      }
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
        <Accordion>
          {interview.map((data, idx) => {
            return (
              <React.Fragment key={data.id}>
                {data.answer && (
                  <Accordion.Item
                    eventKey={data.id.toString()}
                    onClick={handleAccordion}
                  >
                    <Accordion.Header>{data.question}</Accordion.Header>
                    <Accordion.Body>
                      {renderContentWithImages(data.answer)}
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </React.Fragment>
            );
          })}
        </Accordion>
      </div>
    </Container>
  );
};

export default Tech;
