import { useState, useEffect } from "react";
import { Container, Badge } from "react-bootstrap";
import {
  cloud,
  grade,
  notice,
  setting,
  stock,
  supportCustomer,
} from "../../images";
import { Link } from "react-router-dom";
import * as AuthApi from "../../api/auth";
import Dialog from "../modal/dialog";
import { read } from "fs";

const More = () => {
  const [name, setName] = useState("");
  const [isReadyModal, setIsReadyModal] = useState(false);

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
    { src: cloud, alt: "cloud", text: "날씨", ready: true },
    { src: grade, alt: "grade", text: "등급", ready: false },
    { src: notice, alt: "notice", text: "공지사항", ready: false },
    { src: supportCustomer, alt: "inquiry", text: "고객문의", ready: false },
    { src: stock, alt: "stock", text: "주식", ready: true },
    { src: setting, alt: "setting", text: "설정", ready: true },
  ];

  const closeReadyModal = () => {
    setIsReadyModal(false);
  };

  const handleReadyModal = (ready: boolean) => {
    if (ready) {
      setIsReadyModal(true);
    }
  };

  return (
    <Container className="page__sub box__sitemap">
      <div className="box__inner">
        <div className="box__user-info">
          <div className="box__user">
            {name === "" ? (
              <Link to={"/login"} className="link__login">
                로그인해주세요.
              </Link>
            ) : (
              <>
                <p className="text__name">{name}님</p>
                <button type="button" className="button__logout">
                  로그아웃
                </button>
              </>
            )}
          </div>
          <div className="box__notice">
            <p>개선사항이 있으면 언제든지 문의 해주세요!</p>
          </div>
        </div>
        <ul className="list__sitemap">
          {imageItems.map((item, idx) => {
            return (
              <li key={idx} className="list-item">
                <Link
                  to={"/" + item.alt}
                  className="link"
                  onClick={(e) => {
                    if (item.ready) {
                      e.preventDefault();
                      handleReadyModal(item.ready);
                    }
                  }}
                >
                  {(item.alt === "notice" || item.alt === "cloud") && (
                    <Badge bg="danger" className="icon__badge">
                      N
                    </Badge>
                  )}
                  <img src={item.src} alt={item.alt} className="image" />
                  <p className="text">{item.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Dialog
        isOpen={isReadyModal}
        onClose={closeReadyModal}
        title={"준비 중입니다."}
        context={"빠른 시일 내에 업데이트 예정입니다. 기다려주세요."}
      />
    </Container>
  );
};

export default More;
