import { Link } from "react-router-dom";
import {
  emptyImg,
  logo_7eleven,
  logo_cu,
  logo_emart,
  logo_gs,
  logo_hyundai,
  logo_lotte,
  logo_nonghyup,
  logo_shinsegae,
} from "../../images";

interface storeType {
  id: number;
  entpId: null | number;
  name: null | string;
  tel?: null | number | string;
  postNo: null | number;
  addr: null | string;
  addrDetail?: null | string;
  roadAddr?: null | string;
  roadAddrDetail?: null | string;
  registerTime: null | string;
}
interface storeListType {
  storeList: storeType[];
}

export const getImageUrl = (name?: null | string) => {
  if (name?.includes("GS")) {
    return logo_gs;
  } else if (name?.includes("CU")) {
    return logo_cu;
  } else if (name?.includes("이마트")) {
    return logo_emart;
  } else if (name?.includes("신세계")) {
    return logo_shinsegae;
  } else if (name?.includes("세븐일레븐")) {
    return logo_7eleven;
  } else if (name?.includes("현대")) {
    return logo_hyundai;
  } else if (name?.includes("롯데슈퍼")) {
    return logo_lotte;
  } else if (name?.includes("농협")) {
    return logo_nonghyup;
  } else {
    return emptyImg;
  }
};

const StoreList = ({ storeList }: storeListType) => {
  return (
    <ul className="list__store">
      {storeList.map((store, index) => {
        const {
          id,
          entpId,
          name,
          tel,
          postNo,
          addr,
          addrDetail,
          roadAddr,
          roadAddrDetail,
          registerTime,
        } = store || {};
        const address =
          addr && addrDetail
            ? addr + " " + addrDetail
            : (roadAddr || roadAddrDetail) && roadAddr + " " + roadAddrDetail;

        const imgUrl = getImageUrl(name);
        return (
          <li className="list-item" key={`store-item-${index}`}>
            <Link
              to={`/product?storeId=${entpId}&storeName=${name}`}
              className="link__store"
            >
              <div className="box__thumbnail">
                <img src={imgUrl} alt="" className="image" />
              </div>
              <div className="box__info">
                <p className="text__name">{name}</p>
                <p className="text__address">{address}</p>
                <p className="text__number">{tel}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default StoreList;
