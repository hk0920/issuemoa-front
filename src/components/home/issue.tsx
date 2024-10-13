import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Tab, Tabs, Card } from "react-bootstrap";
import { debounce } from "lodash";
import { Dialog, Player } from "../index";
import { empty } from "../../images";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setBoardData,
  setParameters,
  setLoading,
  setError,
  addBoardData,
} from "../../redux/boardSlice";
import { Board } from "../../types/board";
import * as BoardApi from "../../api/board";

let next = false;
let currentSkip = 0;
const Issue = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("Youtube");
  const [modalContext, setModalContext] = useState<string>("");
  const [cookie, setCookie, removeCookie] = useCookies([
    "access_token",
    "issue_scrollY",
  ]);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { skip, limit, type } = useSelector(
    (state: RootState) => state.board.parameters
  );
  const board = useSelector((state: RootState) => state.board.data);

  const handleOpenModal = (url: string) => {
    setModalContext(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const changeType = async (type: string) => {
    dispatch(setParameters({ skip: 0, type: type }));
    dispatch(setBoardData([]));
  };

  const fetchData = async (type: string) => {
    try {
      let response: any;
      dispatch(setParameters({ skip: skip, type: type }));

      if (type === "news") {
        response = await BoardApi.getNewsList(skip, limit);
      } else if (type === "youtube") {
        response = await BoardApi.getYoutubeList(skip, limit);
      }

      if (response) {
        if (response.length > 0) {
          next = true;
        } else {
          next = false;
        }

        // Redux 상태에 데이터를 저장
        dispatch(addBoardData(response));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 디바운싱과 쓰로틀링은 함수 호출의 빈도를 제어하여 과도한 호출을 방지
  const debouncedFetchData = debounce(() => {
    if (next) {
      dispatch(setParameters({ skip: skip + 1 }));
    }
  }, 100);

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - (clientHeight + 100)) {
      debouncedFetchData();
    }
    console.log("???");
  };

  const favoriteHandler = (target: HTMLElement, data: Board) => {
    if (cookie.access_token) {
      saveFavorite(data);
      target.classList.add("button__favorite--active");
    } else {
      setIsAlertModal(true);
    }
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  const handleConfirmModal = () => {
    setIsAlertModal(false);
    navigate("/login");
  };

  const saveFavorite = async (data: Board) => {
    const result = await BoardApi.saveFavoriteData(data);
    if (result) {
      fetchData(type);
    } else {
    }
  };

  useEffect(() => {
    if (board.length === 0 || currentSkip !== skip) {
      currentSkip = skip;
      fetchData(type);
    }

    if (isLoad) {
      //window.scrollTo(0, cookie.issue_scrollY);
    }

    // 디바운싱된 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", scrollHandler);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [dispatch, skip, type]); // skip 값이 변경될 때만 실행

  return (
    <Container className="box__issue">
      <Player
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        context={modalContext}
      />
      <div className="box__inner">
        <Tabs
          defaultActiveKey="news"
          id="justify-tab-example"
          className="box__tab"
          onSelect={(key) => {
            if (key === "news") {
              changeType(key);
            } else if (key === "youtube") {
              changeType(key);
            }
          }}
        >
          <Tab eventKey="news" title="뉴스" className="box__card-wrap">
            {board.map((data, rowIndex) => (
              <Card key={rowIndex} className="box__card-issue">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  <Card.Img
                    src={data.thumbnail ? data.thumbnail : empty}
                    className="box__thumb"
                  />
                  <Card.Body className="box__text">
                    <Card.Text className="text__title">{data.title}</Card.Text>
                  </Card.Body>
                </a>
                <button
                  type="button"
                  className="button__favorite"
                  onClick={(e) => favoriteHandler(e.currentTarget, data)}
                >
                  <span className="for-a11y">관심목록 추가</span>
                </button>
              </Card>
            ))}
          </Tab>
          <Tab eventKey="youtube" title="유튜브" className="box__card-wrap">
            {board.map((data, rowIndex) => (
              <Card key={rowIndex} className="box__card-issue">
                <button
                  type="button"
                  className="link"
                  onClick={() => handleOpenModal(data.url)}
                >
                  <Card.Img
                    src={data.thumbnail ? data.thumbnail : empty}
                    className="box__thumb"
                  />
                  <Card.Body className="box__text">
                    <Card.Text className="text__title">{data.title}</Card.Text>
                  </Card.Body>
                </button>
                <button
                  type="button"
                  className="button__favorite"
                  onClick={(e) => favoriteHandler(e.currentTarget, data)}
                >
                  <span className="for-a11y">관심목록 추가</span>
                </button>
              </Card>
            ))}
          </Tab>
        </Tabs>
      </div>

      <Dialog
        isOpen={isAlertModal}
        onClose={closeAlertModal}
        onConfirm={handleConfirmModal}
        title={"준비 중입니다."}
        context={"로그인 후 이용 가능합니다."}
        buttonText={"로그인"}
      />
    </Container>
  );
};

export default Issue;
