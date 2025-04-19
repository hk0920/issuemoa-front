import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchFilter from "./SearchFilter";
import StoreList from "./StoreList";
import * as StoresdApi from "../../api/store";
import { useLocation } from "react-router-dom";
import StoreVip from "./StoreVip";

const getCurrentLocal = () => {
  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // console.log("위도 :", latitude, "경도:", longitude);

    console.log(position);

    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `위도: ${latitude} °, 경도: ${longitude} °`;
  }

  function error() {
    console.log("현재 위치를 가져올 수 없음");
  }

  if (!navigator.geolocation) {
    console.log("브라우저가 위치 정보를 지원하지 않음");
  } else {
    console.log("위치 파악 중...");
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

const Products = () => {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const storeId = searchParams.get("storeId");
  const storeName = searchParams.get("storeName");

  const [currentLocal, setCurrentLocal] = useState("서대문구");
  const [searchText, setSearchText] = useState("");
  const [storeList, setStoreList] = useState([]);

  const inputChange = (text: string) => {
    setSearchText(text);
    setCurrentLocal(text);
  };

  const getData = async (addr: string) => {
    try {
      const response = await StoresdApi.getStoreList(addr);

      setStoreList(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // getCurrentLocal();
    getData(currentLocal);
  }, []);

  return (
    <Container className="page__sub page__product">
      {storeId && storeName ? (
        <StoreVip id={Number(storeId)} name={storeName} />
      ) : (
        <>
          <SearchFilter
            currentLocal={currentLocal}
            searchText={searchText}
            inputHandler={inputChange}
            updateData={getData}
          />
          {storeList.length > 0 ? (
            <StoreList storeList={storeList} />
          ) : (
            <p className="text__empty">검색한 장소에 검색 결과가 없습니다.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;
