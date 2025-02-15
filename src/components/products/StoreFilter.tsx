import React from "react";

const StoreFilter = () => {
  return (
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
  );
};

export default StoreFilter;
