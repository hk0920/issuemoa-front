import * as BoardApi from '../../api/board';
import { useState, useEffect } from "react";
import { Spinner, Container, Row, Tab, Tabs, Card, Modal} from "react-bootstrap";
import { debounce } from 'lodash';
import { Player } from '../index'

interface Board {
  id: string;
  type: string;
  title: string;
  contents: string;
  url: string;
  thumbnail: string;
}

const Issue = () => {
  let next = false;
  const [type, setType] = useState<string>("news");
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [board, setBoard] = useState<Board[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("Youtube");
  const [modalContext, setModalContext] = useState<string>("");
  const [loadingModal, setLoadingModal] = useState(false);

  const handleCloseLoadingModal = () => {
    setLoadingModal(false);
  };

  const handleOpenModal = (url: string) => {
    setModalContext(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const changeType = async (type:string) => {
    console.log(type)
    setType(type);
    setSkip(0);
    setBoard([]);
  };

  const fetchData = async (type:string) => {
    try {
      setLoadingModal(true);
      
      let response: any;
      if (type === "news") {
         response = await BoardApi.getNewsList(skip, limit);
      } else if (type === "youtube") {
        response = await BoardApi.getYoutubeList(skip, limit);
      }

      if (response) {
        if (response.data.length > 0) {
          next = true;
        } else {
          next = false;
        }
        setBoard((prevBoard) => [...prevBoard, ...response.data]);
      }

      const timeoutId = setTimeout(() => {
        setLoadingModal(false);
      }, 230);

      // 컴포넌트 언마운트 시에 clearTimeout을 호출하여 메모리 누수를 방지합니다.
      return () => clearTimeout(timeoutId);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /*
  디바운싱과 쓰로틀링은 함수 호출의 빈도를 제어하여 과도한 호출을 방지합니다. 간단하게는 lodash 라이브러리의 debounce 함수를 사용할 수 있습니다.
  */
  const debouncedFetchData = debounce(() => {
    if (next) {
      setSkip((prevSkip) => prevSkip + 1);
    }
  }, 50);

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 400) {
      debouncedFetchData();
    }
  };

  useEffect(() => {
    fetchData(type);

    // 디바운싱된 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", scrollHandler);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [skip, type]); // skip 값이 변경될 때만 실행

  return (
    <Container>
      <Player
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        context={modalContext}
      />
      <Modal show={loadingModal} onHide={handleCloseLoadingModal} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        </Modal.Body>
      </Modal>
      <Row>
        <Tabs
          defaultActiveKey="news"
          id="justify-tab-example"
          className="mb-3"
          style={{ position: "fixed", width: "100%", zIndex: 100, backgroundColor: "white" }}
          onSelect={(key) => {
            if (key === "news") {
              changeType(key);
            } else if (key === "youtube") {
              changeType(key);
            }
          }}
        >
          <Tab eventKey="news" title="뉴스" style={{ marginTop: "60px", marginBottom: "60px" }}>
            {board.map((data, rowIndex) => (
              <Card
                key={rowIndex}
                style={{ display: "flex", flexDirection: "row", marginBottom: "15px", maxWidth: "400px" }}
                onClick={() => window.open(data.url)}
                >
                <Card.Img style={{ width: "27%", height: "82px" }} src={data.thumbnail} />
                <Card.Body style={{ flex: "1" }}>
                  <Card.Text
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      height: "100%",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {data.title}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Tab>
          <Tab eventKey="youtube" title="유튜브" style={{ marginTop: "60px", marginBottom: "60px" }}>
            {board.map((data, rowIndex) => (
              <Card
                key={rowIndex}
                style={{ display: "flex", flexDirection: "row", marginBottom: "15px", maxWidth: "400px" }}
                onClick={() => handleOpenModal(data.url)}
                >
                <Card.Img style={{ width: "30%" }} src={data.thumbnail} />
                <Card.Body style={{ flex: "1" }}>
                  <Card.Text
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                    }}
                  >
                  {data.title}
                </Card.Text>
              </Card.Body>
            </Card>
            ))}
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default Issue;