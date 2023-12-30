import { Container, Row, Col, Image } from 'react-bootstrap';
import {
  grade_br,
  grade_ch,
  grade_dia,
  grade_gd,
  grade_gm,
  grade_ir,
  grade_m,
  grade_plt,
  grade_sl,
} from '../../images';

const Grade = () => {
  // 이미지와 설명을 나타내는 데이터 배열
  const gradeData = [
    { image: grade_ch, description: 'Grade CH' },
    { image: grade_gm, description: 'Grade GM' },
    { image: grade_m, description: 'Grade M' },
    { image: grade_dia, description: 'Grade DIA' },
    { image: grade_plt, description: 'Grade PLT' },
    { image: grade_gd, description: 'Grade GD' },
    { image: grade_sl, description: 'Grade SL' },
    { image: grade_br, description: 'Grade BR' },
    { image: grade_ir, description: 'Grade IR' },
  ];

  return (
    <Container className="mt-4">
      <Row style={{marginBottom: "60px"}}>
        {gradeData.map((item, index) => (
          <Col key={index} xs={12} md={6} className="mb-4">
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                <Image src={item.image} alt={`Grade ${index + 1}`} fluid rounded style={{ maxWidth: '30%' }} />
              </div>
              <div style={{ flex: '1', marginLeft: '10px' }}>
                <p>{item.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Grade;
