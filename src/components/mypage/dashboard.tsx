import { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Tab, Tabs, Card } from "react-bootstrap";
import * as VocaApi from "../../api/learning";

const Dashboard = () => {
  const [learnCount, setLearnCount] = useState<number>(0);
  const [tier, setTier] = useState<string>("브론즈");
  const [tierColor, setTierColor] = useState<string>("warning");

  const Grade = ({ badgeColor, tier }: { badgeColor: string; tier: string }) => (
    <p>
      <Badge bg={badgeColor}>{tier}</Badge> {learnCount}개의 단어를 학습하셨어요!
    </p>
  );

  const renderMessage = (badgeColor: string, tier: string) => <Grade badgeColor={badgeColor} tier={tier} />;

  useEffect(() => {
    const countLearn = async () => {
      const response = await VocaApi.countLearn();
      setLearnCount(response.data);
    };
    countLearn();
  }, []);

  return (
    <Container className="page__sub box__mypage-board">
      <div className="box__inner">
        <div className="box__title">
          <h4>📚 학습 진행도</h4>
          {renderMessage(tierColor, tier)}
        </div>
        <Row>
          <Tabs defaultActiveKey="recently" id="justify-tab-example" className="box__tab">
            <Tab eventKey="recently" title="최근 본" className="tab-content">
              {["Primary", "Secondary", "Success", "Danger", "Warning", "Info", "Light", "Dark"].map((variant) => (
                <Card bg={variant.toLowerCase()} key={variant} text={variant.toLowerCase() === "light" ? "dark" : "white"} className="box__card">
                  <Card.Header>Header</Card.Header>
                  <Card.Body>
                    <Card.Title>{variant} Card Title </Card.Title>
                    <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Tab>
            <Tab eventKey="issue" title="관심 이슈">
              이슈
            </Tab>
            <Tab eventKey="word" title="단어 다시보기">
              단어
            </Tab>
          </Tabs>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
