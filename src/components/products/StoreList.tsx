import { Link } from "react-router-dom";

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
        return (
          <li className="list-item">
            <Link to={"/"} className="link__store">
              <div className="box__thumbnail">
                <img
                  src="https://dummyimage.com/300.png/e5e5e5/000"
                  alt=""
                  className="image"
                />
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
