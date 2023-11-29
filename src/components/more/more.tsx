import { useState, useEffect } from "react";
import { Container, Badge } from 'react-bootstrap';
import { cloud, grade, notice, setting, stock, supportCustomer } from '../../images';
import * as AuthUtil from '../../lib/AuthUtil';

const imgStyle = { width: 35, height: 35 };

const More = () => {
  const [name, setName] = useState("Anonymous");
  useEffect(() => {
    const checkAuthentication = async () => {
      const name = await AuthUtil.getName();
      if (name)
        setName(name);
    };

    checkAuthentication();
  }, []);


  const imageItems = [
    { src: cloud, alt: "cloud", text: "날씨" },
    { src: grade, alt: "grade", text: "등급" },
    { src: notice, alt: "notice", text: "공지사항" },
    { src: supportCustomer, alt: "supportCustomer", text: "고객문의" },
    { src: stock, alt: "stock", text: "주식" },
    { src: setting, alt: "setting", text: "설정" },
  ];

  const numCols = 4;
  const numRows = Math.ceil(imageItems.length / numCols);
  const cellWidth = `${100 / numCols}%`;

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "10px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}><span>{name} 님</span></div>
        <div style={{ backgroundColor: "#f8f9fa", padding: "10px", marginTop: "15px" }}>
          <p>개선사항이 있으면 언제든지 문의 해주세요!</p>
        </div>
      </div>
      {[...Array(numRows)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", marginBottom: "30px", width: "100%" }}>
          {imageItems.slice(rowIndex * numCols, (rowIndex + 1) * numCols).map((item, colIndex) => (
            <div key={colIndex} style={{ width: cellWidth, textAlign: "center", position: "relative" }}>
              {(item.alt === "notice" || item.alt === "cloud") && <Badge bg="danger" style={{ position: "absolute", top: 0, left: 0, marginLeft: "15px"}}>N</Badge>}
              <img src={item.src} style={imgStyle} alt={item.alt} />
              <div style={{ marginTop: "5px", fontSize: "12px" }}>{item.text}</div>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}

export default More;
