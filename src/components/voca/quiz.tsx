import Button from "react-bootstrap/Button";
import ReactCardFlip from "react-card-flip";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { prev, cloud } from "../../images";
import { Container, Row, Col } from "react-bootstrap";
import { Dialog } from '../index';
import { useNavigate } from "react-router-dom";
import * as VocaApi from "../../api/voca";
import * as AuthApi from "../../api/auth";
import * as AxiosUtil from "../../lib/AxiosUtil";

interface Props {
  children: React.ReactNode;
}

interface Voca {
  id: number;
  word: string;
  mean: string;
}

function Quiz() {
  const [voca, setVoca] = useState<Voca[]>([]);
  const [vocaId, setVocaId] = useState<number>();
  const [word, setWord] = useState<string>();
  const [mean, setMean] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const [paramOffset, setParamOffset] = useState<number>(0);
  const [totalCnt, setTotalCnt] = useState<number>();
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("확인");
  const [dialogContext, setDialogContext] = useState<string>("");
  const [dialogButtonText, setDialogButtonText] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [temp, setTemp] = useState<string>("");
  const navigate = useNavigate();
  const limit = 30;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    setModalOpen(false);
    navigate("/mypage");
  };

  // 뒤집기 모션
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setIsSliding(false);
  }

  // API - 단어 목록 가져오기
  const fetchData = async () => {
    try {
      setcurrentIndex(0);
      const response = await VocaApi.getList(paramOffset, limit);
      if (response) {
        const data = response.data;
        setVoca(data.list);
        setOffset(data.offset);
        setTotalCnt(data.totalCnt);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 다음 단어 보여주기
  const nextWord = (afterView: String, direction:String): void => {
    let nextIndex = 0;
    
    if (afterView) {
      const learnData = {
        "vocaId": vocaId,
        "learnYn": afterView === "Y" ? "N" : "Y"
      }
  
      // 학습진도 등록
      VocaApi.save(learnData);

      if (direction === "prev") {
        if (currentIndex === 0) {
          setDialogContext("첫 단어 입니다.");
          return;
        }
        setcurrentIndex(currentIndex - 1);
        nextIndex = currentIndex - 1;
      } else {
        setcurrentIndex(currentIndex + 1);
        nextIndex = currentIndex + 1;
      }
    }

    if (voca.length !== 0 && voca.length <= nextIndex) {
      if (offset === totalCnt) {
        setDialogContext("마지막 단어입니다. 다음 업데이트를 기대해주세요!");
        setIsSliding(false);
      } else {
        setParamOffset(paramOffset + limit);
      }
      
      return;
    }

    setWord("");
    setMean("");
    
    if (isFlipped) {
      setIsFlipped(false);
    }

    setIsSliding(true);

    // 슬라이드 후 단어 변경
    setTimeout(() => {
      setVocaId(voca?.[nextIndex]?.id);
      setWord(voca?.[nextIndex]?.word);
      setMean(voca?.[nextIndex]?.mean);
      setIsSliding(false);
    }, 250);
  };

  const handlePrevImageClick = () => {
    nextWord("Y", "prev");
  };

  const handleButton = async (afterView:string) => {

    const isAuthenticated = await AuthApi.checkUserAuthentication();

    if (!isAuthenticated) {
      setDialogContext("로그인 후 이용해 주세요!");
      setDialogButtonText("로그인");
      handleOpenModal();
      return;
    }

    if (!isButtonDisabled) {
      // 버튼 비활성화 상태로 변경
      setButtonDisabled(true);

      // 일정 시간 후에 버튼을 다시 활성화
      setTimeout(() => {
        nextWord(afterView, "");
        setButtonDisabled(false);
      }, 130);
    }
  }

  const handleAfterWordClick = () => {
    handleButton("Y");
  };

  const handleNextWordClick = () => {
    handleButton("N");
  };

  const Card = ({ children }: Props) => {
    return (
      <div
        style={{
          width: "100%",
          height: 300,
          padding: 20,
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    );
  };

  const Word = ({ children, isSliding }: { children: React.ReactNode; isSliding?: boolean }) => {
    const slideInAnimation = useSpring({
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0%)" },
      reset: true
    });

    return (
      <animated.div style={isSliding ? slideInAnimation : {} }>
        <div style={{ width: "100%", marginBottom: 30, fontSize: "35px", textAlign: "center", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={prev} alt="prev" onClick={handlePrevImageClick} style={{ marginTop: -20, marginRight: 30, width: "25px" }} />
            {children}
          <span style={{ marginTop: 8, marginLeft: 20, width: "25px" }}></span>
        </div>
      </animated.div>
    );
  };

  
  const getWeather = async () => {
    const getPosition = (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
  
    try {
      const position = await getPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
      const url = `/weather-api/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
      const response = await AxiosUtil.send("GET", url, {}, "");
      const weather = response.weather[0];      
      const icon = weather.icon;
      const temp = Math.round(response.main.temp) + "° " + weather.description;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      setWeather(iconURL);
      setTemp(temp);
    } catch (error) {
      console.error("Error getting geolocation or weather:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [paramOffset]);

  useEffect(() => {
    nextWord("", "");
  }, [voca]);

  useEffect(() => {
    setWeather(cloud);
    getWeather();
  }, []);

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <Dialog
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        title={dialogTitle}
        context={dialogContext}
        buttonText={dialogButtonText}
      />
      <Row>
        <Col>
          <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
            <span style={{fontSize: "13px"}}>{temp}</span>
            <img src={weather} alt="weather" style={{ width: "25px" }} />
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card>
              <Word isSliding={isSliding}>
                {word}
              </Word>
              <Button style={{ width: "100%" }} variant="light" onClick={flipCard} size="lg">
                ✔️
              </Button>
            </Card>
            <Card>
              <Word isSliding={isSliding}>
                {mean}
              </Word>
              <Button style={{ width: "100%" }} variant="light" onClick={flipCard} size="lg">
                ✔️
              </Button>
            </Card>
          </ReactCardFlip>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={{ width: "150px" }}
            onClick={handleAfterWordClick}
            variant="primary"
            size="lg"
          >
            다음에 보기 ✍️
          </Button>
        </Col>
        <Col>
          <Button
            style={{ width: "150px" }}
            onClick={handleNextWordClick}
            variant="success"
            size="lg"
          >
            알고 있어요 😊
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Quiz;
