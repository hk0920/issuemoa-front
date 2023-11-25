import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactCardFlip from 'react-card-flip';
import Button from 'react-bootstrap/Button';
import { useSpring, animated } from 'react-spring'; // 추가

interface Props {
  children: React.ReactNode;
}

interface Post {
  word: string;
  mean: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const temporaryData: Post[] = [
    {
      word: 'Apple',
      mean: '사과',
    },
    {
      word: 'Car',
      mean: '자동차',
    },
  ];

  return temporaryData;
};

const Card = ({ children, isSliding }: { children: React.ReactNode; isSliding?: boolean }) => {
  const slideInAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
    reset: true,
    onRest: () => {
      // Handle animation end when the card finishes sliding
      // For example, you can set some state or trigger some action here
    },
  });

  return (
    <animated.div style={isSliding ? slideInAnimation : {}
    }>
      <div
      style={{
        width: "100%",
        height: 500,
        padding: 20,
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
    </animated.div>
  );
};

const Word = ({ children }: Props) => {
  return (
    <div style={{ marginBottom: 30, fontSize: "35px", textAlign: "center", fontWeight: "bold" }}>{children}</div>
  );
};

function Quiz() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [word, setWord] = useState<String>();
  const [mean, setMean] = useState<String>();
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setIsSliding(false);
  }

  const fetchData = async () => {
    try {
      const temporaryPosts = await fetchPosts();
      setPosts(temporaryPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const nextWord = (afterView: String): void => {
    let nextIndex = 0;
    if (afterView === 'Y') {
      console.log("나중에 보기")
    }

    if (afterView) {
      setcurrentIndex(currentIndex + 1);
      nextIndex = currentIndex + 1;
    }

    setWord(posts?.[nextIndex]?.word);
    setMean(posts?.[nextIndex]?.mean);
    console.log(nextIndex);
  };

  const [isSliding, setIsSliding] = useState(false);

  const handleAfterNextWordClick = () => {
    nextWord('Y');
    setIsSliding(true);
  };

  const handleNextWordClick = () => {
    nextWord('N');
    setIsSliding(true);
  };

  useEffect(() => {
    nextWord('');
  }, [posts]);

  useEffect(() => {
    fetchData();
  }, []);

  const slideInAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' }
  });

  return (
    <Container>
      <Row>
        <Col xs={18} md={12}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card isSliding={isSliding}>
              <Word>{word}</Word>
              <Button style={{ width: "100%" }} variant="light" onClick={flipCard} size="lg">
                Check ✔️
              </Button>
            </Card>
            <Card isSliding={isSliding}>
              <Word>{mean}</Word>
              <Button style={{ width: "100%" }} variant="light" onClick={flipCard} size="lg">
                Check ✔️
              </Button>
            </Card>
          </ReactCardFlip>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={{ width: "100%" }}
            onClick={handleAfterNextWordClick}
            variant="primary"
            size="lg"
          >
            다음에 다시 볼래요 ✍️
          </Button>
        </Col>
        <Col>
          <Button
            style={{ width: "100%" }}
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
