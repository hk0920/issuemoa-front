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
import { Cookies } from "react-cookie";
import { gradeArray } from "./grade";

const More = () => {
  const [user, setUser] = useState({
    name: "",
    gradeCode: "I",
  });
  const [isReadyModal, setIsReadyModal] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const checkAuthentication = async () => {
      const name = await AuthApi.getName();
      let gradeCode = await AuthApi.getGradeCode();

      if (gradeCode === null) gradeCode = "I";

      if (name) {
        setUser({
          name: name,
          gradeCode: gradeCode,
        });
      }
    };

    if (cookies.get("access_token")) {
      checkAuthentication();
    }
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

  const handleLogoutClick = async () => {
    const isSignOout = await AuthApi.userSignOut();
    if (isSignOout)
      setUser({
        name: "",
        gradeCode: "",
      });
  };

  return (
    <Container className="page__sub box__sitemap">
      <div className="box__inner">
        <div className="box__user-info">
          <div className="box__user">
            {user.name === "" ? (
              <Link to={"/login"} className="link__login">
                로그인해주세요.
              </Link>
            ) : (
              <>
                <span className="text__grade">
                  <img
                    src={
                      gradeArray.find((obj) => obj.code === user.gradeCode)
                        ?.icon
                    }
                    alt={
                      gradeArray.find((obj) => obj.code === user.gradeCode)
                        ?.text
                    }
                    className="image"
                  />
                </span>
                <span className="text__name">{user.name}님</span>
                <button
                  type="button"
                  className="button__logout"
                  onClick={() => handleLogoutClick()}
                >
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
