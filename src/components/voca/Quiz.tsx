import { useState, ReactNode } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactCardFlip from 'react-card-flip';
import Button from 'react-bootstrap/Button';

interface Props {
  children: ReactNode;
}

const Card = ({ children } : Props) => {
  return (
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
  );
};

const Word = ({ children } : Props) => {
  return (
    <div style={{ marginBottom: 30, fontSize:"35px", textAlign:"center", fontWeight:"bold" }}>{children}</div>
  );
}

function Quiz() {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => setIsFlipped(!isFlipped);
  return (
    <Container>
      <Row>
        <Col xs={18} md={12}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card>
              <Word>Apple</Word>
              <Button style={{width:"100%"}} variant="light" onClick={flipCard} size="lg">Check ✔️</Button>
            </Card>
            <Card>
              <Word>사과</Word>
              <Button style={{width:"100%"}} variant="light" onClick={flipCard} size="lg">Check ✔️</Button>
            </Card>
          </ReactCardFlip>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={{width:"100%"}} variant="primary" size="lg">다음에 다시 볼래요 ✍️</Button>
        </Col>
        <Col>
          <Button style={{width:"100%"}} variant="success" size="lg">알고 있어요 😊</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Quiz;
