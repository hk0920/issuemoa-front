import { useState, useEffect } from "react";
import { Container, Badge } from "react-bootstrap";
import { cloud, grade, notice, setting, stock, supportCustomer } from "../../images";
import { useNavigate } from "react-router-dom";
import * as AuthApi from "../../api/auth";

const More = () => {
  const navigate = useNavigate();
  const imgStyle = { width: 35, height: 35 };
  const [name, setName] = useState("");

  const handleMenuClick = (menu: string) => {
    navigate("/" + menu);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const name = await AuthApi.getName();
      if (name) {
        setName(name);
      }
    };

    checkAuthentication();
  }, []);

  const imageItems = [
    { src: cloud, alt: "cloud", text: "날씨" },
    { src: grade, alt: "grade", text: "등급" },
    { src: notice, alt: "notice", text: "공지사항" },
    { src: supportCustomer, alt: "inquiry", text: "고객문의" },
    { src: stock, alt: "stock", text: "주식" },
    { src: setting, alt: "setting", text: "설정" },
  ];

  const numCols = 4;
  const numRows = Math.ceil(imageItems.length / numCols);
  const cellWidth = `${100 / numCols}%`;

  return (
    <Container className="page__sub box__sitemap">
      <div className="box__inner">
        <div className="box__user-info">
          <div className="box__user">
            {name === "" ? (
              <button type="button" className="button__login">
                로그인해주세요.
              </button>
            ) : (
              <p className="text__name">{name}님</p>
            )}
          </div>
          <div className="box__notice">
            <p>개선사항이 있으면 언제든지 문의 해주세요!</p>
          </div>
        </div>
        {[...Array(numRows)].map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", marginBottom: "30px", width: "100%" }}>
            {imageItems.slice(rowIndex * numCols, (rowIndex + 1) * numCols).map((item, colIndex) => (
              <div key={colIndex} style={{ width: cellWidth, textAlign: "center", position: "relative" }} onClick={() => handleMenuClick(item.alt)}>
                {(item.alt === "notice" || item.alt === "cloud") && (
                  <Badge bg="danger" style={{ position: "absolute", top: 0, left: 0, marginLeft: "15px" }}>
                    N
                  </Badge>
                )}
                <img src={item.src} style={imgStyle} alt={item.alt} />
                <div style={{ marginTop: "5px", fontSize: "12px" }}>{item.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default More;
