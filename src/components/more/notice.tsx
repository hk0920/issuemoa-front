import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Notice = () => {
  // 가상의 공지사항 데이터
  const notices = [
    { id: 1, title: '서비스 업데이트 안내', content: '서비스가 업데이트되었습니다. 새로운 기능과 개선 사항을 확인하세요.' },
    { id: 2, title: '일시적인 서비스 중단 예정', content: '내일 오후 2시부터 4시까지 일시적인 서비스 중단이 예정되어 있습니다. 양해 부탁드립니다.' },
    // 추가적인 공지사항 데이터 추가 가능
  ];

  return (
    <Container className="mt-4">
      <h2>공지사항</h2>
      {notices.map((notice) => (
        <Card key={notice.id} className="mt-3">
          <Card.Body>
            <Card.Title>{notice.title}</Card.Title>
            <Card.Text>{notice.content}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {/* 기타 필요한 정보 추가 가능 */}
          </ListGroup>
        </Card>
      ))}
    </Container>
  );
};

export default Notice;
