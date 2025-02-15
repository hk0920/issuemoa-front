import React from "react";

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

const ProductFilter = () => {
  return (
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
  );
};

export default ProductFilter;
