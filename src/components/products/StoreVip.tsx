import { getImageUrl } from "./StoreList";
import * as StoresdApi from "../../api/store";
import { useEffect, useState } from "react";

interface storeInfo {
  id: number;
  name: string;
}

const StoreVip = ({ id, name }: storeInfo) => {
  const [productList, setProductList] = useState([]);
  const getStoreLogoImageUrl = getImageUrl(name);

  const getData = async (entpId: number) => {
    try {
      const response = await StoresdApi.getProductsList(entpId);

      setProductList(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <>
      <div className="box__store-info">
        <div className="box__thumb">
          <img src={getStoreLogoImageUrl} alt="" className="image" />
        </div>
        <p className="text">{name}</p>
      </div>
      <div className="box__product-items">
        <ul className="list__products">
          {productList.map((item, idx) => {
            const {
              entpId,
              goodsId,
              name,
              detailMean,
              price,
              plusOneYn,
              dcYn,
              dcStartDay,
              inspectDay,
            } = item || {};

            return (
              <li className="list-item">
                <div className="box__item-info">
                  <p className="text__name">{name}</p>
                  <p className="text__price">
                    {Number(price).toLocaleString()}
                    <span className="text__unit">원</span>
                  </p>
                </div>
                <div className="box__item-etc">
                  <p className="text">등록 날짜 : {inspectDay}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StoreVip;
