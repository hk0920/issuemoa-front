import { getImageUrl } from "./StoreList";
import * as StoresdApi from "../../api/store";
import { useEffect, useState } from "react";

interface storeInfo {
  id: number;
  name: string;
}

const StoreDetail = ({ id, name }: storeInfo) => {
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
              dcEndDay,
              inspectDay,
            } = item || {};

            const dcStart =
              String(dcStartDay).substring(0, 4) +
              "-" +
              String(dcStartDay).substring(4, 6) +
              "-" +
              String(dcStartDay).substring(6, 8);
            const dcEnd =
              String(dcEndDay).substring(0, 4) +
              "-" +
              String(dcEndDay).substring(4, 6) +
              "-" +
              String(dcEndDay).substring(6, 8);

            const dcInfo = {
              dcYn: dcYn,
              startDate: dcStart,
              endDate: dcEnd,
            };

            const inspectDate =
              String(inspectDay).substring(0, 4) +
              "-" +
              String(inspectDay).substring(4, 6) +
              "-" +
              String(inspectDay).substring(6, 8);

            return (
              <li className="list-item">
                <div className="box__item-info">
                  <p className="text__name">{name}</p>
                  <p className="text__price">
                    {Number(price).toLocaleString()}
                    <span className="text__unit">원</span>
                  </p>
                </div>

                <div className="box__item-lmo">
                  {plusOneYn === "Y" && dcYn === "Y"}
                  <div className="box__lmo">
                    {plusOneYn && (
                      <span className="text__lmo text__lmo-gift">
                        <span className="for-a11y">사은품</span>1+1
                      </span>
                    )}
                    {dcInfo.dcYn === "Y" && (
                      <span className="text__lmo">
                        할인 기간 : {dcInfo.startDate + "~" + dcInfo.endDate}
                      </span>
                    )}
                  </div>
                  <p className="text__date">등록 날짜 : {inspectDate}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StoreDetail;
