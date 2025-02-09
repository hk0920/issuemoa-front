import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Tab, Tabs, Card, Pagination } from "react-bootstrap";
import { Dialog, Player } from "../index";
import { empty } from "../../images";
import { Board } from "../../types/board";
import * as BoardApi from "../../api/board";
import KeywordFilter from "./KeywordFilter";

// PaginationComponent props 타입 정의
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setSearchParams: (params: { page: string }) => void;
}

const Issue = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("Youtube");
  const [modalContext, setModalContext] = useState<string>("");
  const [cookie, setCookie, removeCookie] = useCookies([
    "access_token",
    "issue_scrollY",
    "recent_items",
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [isAlertModal, setIsAlertModal] = useState(false);
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board[]>([]);
  const [type, setType] = useState<string>("news");
  const [totalPage, setTotalPage] = useState<number>(0);
  const limit = 40;

  const handleOpenModal = (url: string) => {
    setModalContext(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const changeType = async (type: string) => {
    setType(type);
    setSearchParams({ page: "1" });
  };

  const fetchData = async (currentPage: number, type: string) => {
    try {
      let response: any;

      if (type === "news") {
        response = await BoardApi.getNewsList(currentPage, limit);
      } else if (type === "youtube") {
        response = await BoardApi.getYoutubeList(currentPage, limit);
      }

      if (response) {
        setBoard(response.list);
        setTotalPage(response.totalPage-1);
        window.scrollTo(0, 0); // 화면을 최상단으로 스크롤
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const favoriteHandler = (target: HTMLElement, data: Board) => {
    // if (cookie.access_token) {
    //   saveFavorite(data);
    //   target.classList.add("button__favorite--active");
    // } else {
    //   setIsAlertModal(true);
    // }
  };

  const saveFavorite = async (data: Board) => {
    //   const result = await BoardApi.saveFavoriteData(data);
    //   if (result) {
    //     fetchData(type);
    //   }
  };

  const closeAlertModal = () => {
    setIsAlertModal(false);
  };

  const handleConfirmModal = () => {
    setIsAlertModal(false);
    navigate("/login");
  };

  const saveRecentItems = (data: any) => {
    if (!cookie.recent_items) {
      setCookie("recent_items", [data]);
    } else {
      setCookie("recent_items", [data, ...cookie.recent_items]);
    }
  };

  useEffect(() => {
    fetchData(currentPage, type);
  }, [currentPage, type]); // skip 값이 변경될 때만 실행

  // 동적으로 페이지네이션 버튼 생성
  const PaginationComponent = ({ currentPage, totalPage, setSearchParams }: PaginationProps) => {
    const paginationRange = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2); // currentPage 기준으로 2페이지 전부터 시작
    let endPage = Math.min(totalPage, currentPage + 2); // currentPage 기준으로 2페이지 후까지 끝

    // 페이지 범위가 부족하면 조정
    if (endPage - startPage < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPage) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationRange.push(i);
    }

    return (
      <Pagination className="pagination">
        {paginationRange.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setSearchParams({ page: String(page) })}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  return (
    <Container className="box__issue">
      <Player
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        context={modalContext}
      />
      <div className="box__inner">
        <div className="box__tab-container">
          <KeywordFilter />
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
                    onClick={() => saveRecentItems(data)}
                  >
                    <Card.Img
                      src={data.thumbnail ? data.thumbnail : empty}
                      className="box__thumb"
                    />
                    <Card.Body className="box__text">
                      <Card.Text className="text__title">
                        {data.title}
                      </Card.Text>
                    </Card.Body>
                  </a>
                </Card>
              ))}
              <div className="pagination-container">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPage={totalPage}
                  setSearchParams={setSearchParams}
                />
              </div>
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
                      <Card.Text className="text__title">
                        {data.title}
                      </Card.Text>
                    </Card.Body>
                  </button>
                </Card>
              ))}
              <div className="pagination-container">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPage={totalPage}
                  setSearchParams={setSearchParams}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
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
