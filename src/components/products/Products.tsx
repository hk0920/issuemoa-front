import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchFilter from "./SearchFilter";
import StoreList from "./StoreList";

const dummyStoreList = [
  {
    id: 336,
    entpId: 1527,
    name: "롯데슈퍼역촌점",
    tel: "02-000-0000",
    postNo: 3404,
    addr: "서울특별시 은평구 역촌동 17-1 기린빌딩",
    addrDetail: null,
    roadAddr: "서울특별시 은평구 진흥로 103",
    roadAddrDetail: "(역촌동)",
    registerTime: "2025-01-20T00:34:15",
  },
  {
    id: 337,
    entpId: 1528,
    name: "홈플러스은평점",
    tel: "02-000-0000",
    postNo: 3404,
    addr: "서울특별시 은평구 역촌동 17-1 기린빌딩",
    addrDetail: null,
    roadAddr: "서울특별시 은평구 진흥로 103",
    roadAddrDetail: "(역촌동)",
    registerTime: "2025-01-20T00:34:15",
  },
];

const getCurrentLocal = () => {
  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("위도 :", latitude, "경도:", longitude);

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
  const [searchText, setSearchText] = useState("");

  const inputChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    // getCurrentLocal();
  }, []);

  return (
    <Container className="page__sub page__product">
      <SearchFilter
        currentLocal={"성동구"}
        searchText={searchText}
        inputHandler={inputChange}
      />
      <StoreList storeList={dummyStoreList} />
    </Container>
  );
};

export default Products;
