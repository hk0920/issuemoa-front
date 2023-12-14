import { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Tab, Tabs, Card } from "react-bootstrap";
import * as AuthApi from '../../api/auth';

const Issue = () => {
  return (
    <Container>
      <Row>
        <Tabs
          defaultActiveKey="news"
          id="justify-tab-example"
          className="mb-3"
          style={{ position: "fixed", width: "100%", zIndex: 100, backgroundColor: "white" }}
        >
          <Tab eventKey="news" title="뉴스" style={{ marginTop: "60px", marginBottom: "60px" }}>
            <Card style={{ display: "flex", flexDirection: "row", marginBottom: "15px" }}>
              <Card.Img
                style={{ width: "30%" }}
                src="https://imgnews.pstatic.net/image/003/2023/12/14/NISI20231214_0001437672_web_20231214173746_20231214173904338.jpg?type=w647"
              />
              <Card.Body style={{ flex: "1" }}>
                <Card.Text style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", height: "100%", overflow: "hidden", WebkitLineClamp: 2 }}>
                  6년 만에 '신형 랭글러' 온다… 지프, 사전 계약 시작
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ display: "flex", flexDirection: "row", marginBottom: "15px" }}>
              <Card.Img
                style={{ width: "30%" }}
                src="https://mimgnews.pstatic.net/image/origin/029/2023/12/14/2843442.jpg?type=nf220_150"
              />
              <Card.Body style={{ flex: "1" }}>
                <Card.Text style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", height: "100%", overflow: "hidden", WebkitLineClamp: 2 }}>
                  "출근길 우산 필수"…강원 산지는 최대 30㎝ 이상 눈[내일날씨]
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="커뮤니티" title="관심 이슈" style={{ marginTop: "60px", marginBottom: "60px" }}>
            이슈
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default Issue;
