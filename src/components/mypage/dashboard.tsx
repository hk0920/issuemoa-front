import { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Tab, Tabs, Card } from "react-bootstrap";
import * as VocaApi from "../../api/learning";
import * as BoardApi from "../../api/board";
import * as InterViewApi from "../../api/learning";
import { empty } from "../../images";
import renderCode from "../tech/renderCode";

interface Voca {
  id: number;
  word: string;
  mean: string;
}
interface Issue {
  id: string;
  type: string;
  title: string;
  contents: string;
  url: string;
  thumbnail: string;
}

interface Tech {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const Dashboard = () => {
  const [learnCount, setLearnCount] = useState<number>(0);
  const [tier, setTier] = useState<string>("브론즈");
  const [tierColor, setTierColor] = useState<string>("warning");
  const [vocaData, setVocaData] = useState<Voca[]>([]);
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [techData, setTechData] = useState<Tech[]>([]);

  const Grade = ({
    badgeColor,
    tier,
  }: {
    badgeColor: string;
    tier: string;
  }) => (
    <p>
      <Badge bg={badgeColor}>{tier}</Badge> {learnCount}개의 단어를
      학습하셨어요!
    </p>
  );

  const renderMessage = (badgeColor: string, tier: string) => (
    <Grade badgeColor={badgeColor} tier={tier} />
  );

  useEffect(() => {
    const countLearn = async () => {
      const response = await VocaApi.countLearn();
      setLearnCount(response);
    };
    countLearn();
  }, []);

  const getRetryVoca = async () => {
    const response = await VocaApi.getRetryVocaList(0, 20);
    // console.log("voca", response.data.list);
    setVocaData(response.list);
  };

  const getFavoriteIssue = async () => {
    const response = await BoardApi.getFavoriteList();
    // console.log("response", response.data);
    setIssueData(response);
  };

  const getFavoriteTech = async () => {
    const response = await InterViewApi.getFavoriteInterview();
    setTechData(response.list);
  };

  return (
    <Container className="page__sub box__mypage-board">
      <div className="box__inner">
        <div className="box__title">
          <h4>📚 학습 진행도</h4>
          {renderMessage(tierColor, tier)}
        </div>
        <Row>
          <Tabs
            defaultActiveKey="recently"
            id="justify-tab-example"
            className="box__tab"
            onSelect={(key) => {
              if (key === "word") {
                getRetryVoca();
              } else if (key === "issue") {
                getFavoriteIssue();
              } else if (key === "tech") {
                getFavoriteTech();
              }
            }}
          >
            <Tab
              eventKey="recently"
              title="최근 본"
              className="box__tab-content"
            >
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
                  className="box__card"
                >
                  <Card.Header>Header</Card.Header>
                  <Card.Body>
                    <Card.Title>{variant} Card Title </Card.Title>
                    <Card.Text>
                      Somxe quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Tab>
            <Tab
              eventKey="issue"
              title="관심 이슈"
              className="box__tab-content"
            >
              {issueData.length > 0 ? (
                <>
                  {issueData.map((data, rowIndex) => (
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
                          <Card.Text className="text__title">
                            {data.title}
                          </Card.Text>
                        </Card.Body>
                      </a>
                    </Card>
                  ))}
                </>
              ) : (
                <p className="text__empty">등록된 관심 이슈가 없습니다.</p>
              )}
            </Tab>
            <Tab
              eventKey="word"
              title="단어 다시보기"
              className="box__tab-content"
            >
              {vocaData.length > 0 ? (
                <>
                  {vocaData?.map((item, idx) => {
                    return (
                      <Card key={idx} className="box__card">
                        <Card.Header>{item.word}</Card.Header>
                        <Card.Body>
                          <Card.Title>{item.word}</Card.Title>
                          <Card.Text>{item.mean}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <p className="text__empty">단어 다시 보기 리스트가 없습니다.</p>
              )}
            </Tab>
            <Tab eventKey="tech" title="관심 Tech" className="box__tab-content">
              {techData.length > 0 ? (
                <>
                  {techData?.map((item, idx) => {
                    return (
                      <Card key={item.id} className="box__card">
                        <Card.Header>
                          <span className="box__label-type">
                            {item.category}
                          </span>
                          {item.question}
                        </Card.Header>
                        <Card.Body>{renderCode(item.answer)}</Card.Body>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <p className="text__empty">단어 다시 보기 리스트가 없습니다.</p>
              )}
            </Tab>
          </Tabs>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
