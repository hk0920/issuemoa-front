import { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Tab, Tabs, Card } from "react-bootstrap";
import * as VocaApi from "../../api/voca";

const Dashboard = () => {
  const [learnCount, setLearnCount] = useState<number>(0);
  const [tier, setTier] = useState<string>("브론즈");
  const [tierColor, setTierColor] = useState<string>("warning");

  const Grade = ({ badgeColor, tier }: { badgeColor: string; tier: string }) => (
    <p>
      <Badge bg={badgeColor}>{tier}</Badge> {learnCount}개의 단어를 학습하셨어요!
    </p>
  );
  
  const renderMessage = (badgeColor: string, tier: string) => (
    <Grade badgeColor={badgeColor} tier={tier} />
  );

  useEffect(() => {
    const countLearn = async () => {
      const response = await VocaApi.countLearn();
      setLearnCount(response.data);
    };
    countLearn();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h4>📚 학습 진행도</h4>
          {renderMessage(tierColor, tier)}
        </Col>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="recently"
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab eventKey="recently" title="최근 본" style={{marginBottom: "60px"}}>
            {[
              "Primary",
              "Secondary",
              "Success",
              "Danger",
              "Warning",
              "Info",
              "Light",
              "Dark",
            ].map((variant) => (
              <Card
                bg={variant.toLowerCase()}
                key={variant}
                text={variant.toLowerCase() === "light" ? "dark" : "white"}
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>{variant} Card Title </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
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
    </Container>
  );
};

export default Dashboard;
