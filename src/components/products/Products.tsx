import { Container } from "react-bootstrap";

const dummyProduct = [
  "사과",
  "배",
  "배추",
  "무",
  "양파",
  "상추",
  "오이",
  "호박",
  "쇠고기",
  "돼지고기",
  "닭고기",
  "달걀",
  "조기",
  "명태",
  "오징어",
  "고등어",
  "애호박",
  "냉동참조기",
  "삼겹살",
  "동태",
  "갈치",
  "참기름",
  "쌀",
];

const Products = () => {
  return (
    <Container className="page__sub page__product">
      <div className="box__inner box__category-store">
        <button type="button" className="button__category">
          <p className="box__icon">
            <img src="./images/product/icon__store1.png" alt="" />
          </p>
          <p className="text">시장</p>
        </button>
        <button type="button" className="button__category">
          <p className="box__icon">
            <img src="./images/product/icon__store2.png" alt="" />
          </p>
          <p className="text">시장</p>
        </button>
      </div>
      <div className="box__inner box__category-product">
        {dummyProduct.map((item, idx) => {
          return (
            <button type="button" className="button__category">
              <p className="box__icon">
                <img
                  src={`./images/product/icon__product${idx + 1}.png`}
                  alt=""
                />
              </p>
              <p className="text">{item}</p>
            </button>
          );
        })}
      </div>
    </Container>
  );
};

export default Products;
