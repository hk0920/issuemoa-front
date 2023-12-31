import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

const Inquiry: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 처리하거나 전송할 수 있습니다.
    console.log('Form Data:', formData);
  };

  return (
    <Container className="mt-4">
      <h2>고객 문의</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mt-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mt-3" controlId="formInquiryType">
          <Form.Label>문의 유형</Form.Label>
          <Form.Control as="select" name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
            <option value="general">일반 문의</option>
            <option value="technical">기술 지원</option>
            <option value="billing">요금 문의</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-3" controlId="formMessage">
          <Form.Label>문의 내용</Form.Label>
          <Form.Control as="textarea" rows={4} name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit" style={{ width: '100%' }}>
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default Inquiry;
