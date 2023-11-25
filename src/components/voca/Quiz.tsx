import { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactCardFlip from 'react-card-flip';
import Button from 'react-bootstrap/Button';
import * as AxiosUtil from '../../lib/AxiosUtils';

interface Props {
  children: React.ReactNode;
}

interface Post {
  word: string;
  mean: string;
}

const Card = ({ children, isSliding }: { children: React.ReactNode; isSliding?: boolean }) => {
  const slideInAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
    reset: true
  });

  return (
    <animated.div style={isSliding ? slideInAnimation : {} }>
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
    </animated.div>
  );
};

const Word = ({ children }: Props) => {
  return (
    <div style={{ width:"500px", marginBottom: 30, fontSize: "35px", textAlign: "center", fontWeight: "bold" }}>{children}</div>
  );
};

function Quiz() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [word, setWord] = useState<string>();
  const [mean, setMean] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const [paramOffset, setParamOffset] = useState<number>(0);
  const [totalCnt, setTotalCnt] = useState<number>();
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const moreLimit = 24;

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setIsSliding(false);
  }

  const fetchData = () => {
    try {
      setcurrentIndex(0);
      AxiosUtil.send('GET','/voca-api/voca/list?offset=' + paramOffset, {}, '', (e:any) => {
        if (e.data) {
          const data = e.data;
          setPosts(data.list);
          setOffset(data.offset);
          setTotalCnt(data.totalCnt);
        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const nextWord = (afterView: String): void => {
    let nextIndex = 0;
    
    if (afterView) {
      setcurrentIndex(currentIndex + 1);
      nextIndex = currentIndex + 1;
    }

    if (afterView === 'Y') {
      // PUT - API CALL
      console.log("나중에 보기")
    }

    if (posts.length !== 0 && posts.length <= nextIndex) {
      if (offset == totalCnt) {
        alert('마지막 단어입니다. 다음 업데이트를 기대해주세요!');
        setIsSliding(false);
      } else {
        setParamOffset(paramOffset + moreLimit);
      }
    } else {
      if (isFlipped) setIsFlipped(false);
      setIsSliding(true);
      setWord(posts?.[nextIndex]?.word);
      setMean(posts?.[nextIndex]?.mean);
    }
  };

  const handleAfterNextWordClick = () => {
    nextWord('Y');
  };

  const handleNextWordClick = () => {
    nextWord('N');
  };

  useEffect(() => {
    fetchData();
  }, [paramOffset]);

  useEffect(() => {
    nextWord('');
  }, [posts]);

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <Row>
        <Col xs={18} md={12}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card isSliding={isSliding}>
              <Word>{word}</Word>
              <Button style={{ width: "500px"}} variant="light" onClick={flipCard} size="lg">
                Check ✔️
              </Button>
            </Card>
            <Card isSliding={isSliding}>
              <Word>{mean}</Word>
              <Button style={{ width: "500px"}} variant="light" onClick={flipCard} size="lg">
                Check ✔️
              </Button>
            </Card>
          </ReactCardFlip>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={{ width: "150px" }}
            onClick={handleAfterNextWordClick}
            variant="primary"
            size="lg"
          >
            다음에 볼게요 ✍️
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
