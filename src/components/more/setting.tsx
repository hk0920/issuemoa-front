import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { gradeArray } from "./grade";
import * as AuthApi from "../../api/auth";

import "../../styles/setting.scss";

const OptionComponent = (props: any) => {
  const { title, titleCode, optionList } = props.data || {};
  let theme = props.theme ? "D" : "W";

  const onChange = () => {
    if (title === "테마") {
      props.themeEvent();
    }
  };

  return (
    <div className="box__option">
      <p className="text__title">{title}</p>
      <select name={titleCode} className="box__select" onChange={onChange}>
        {optionList.map((option: any, idx: number) => {
          return (
            <option
              value={option.code}
              key={idx}
              selected={theme === option.code ? true : false}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

interface propsType {
  theme: boolean;
  themeEvent: Function;
}

const Setting = (props: propsType) => {
  const [user, setUser] = useState({
    name: "",
    gradeCode: "I",
  });
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

  const handleLogoutClick = async () => {
    const isSignOout = await AuthApi.userSignOut();
    if (isSignOout)
      setUser({
        name: "",
        gradeCode: "",
      });
  };
  return (
    <Container className="page__sub page__setting">
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
                  gradeArray.find((obj) => obj.code === user.gradeCode)?.icon
                }
                alt={
                  gradeArray.find((obj) => obj.code === user.gradeCode)?.text
                }
                className="image"
              />
            </span>
            <span className="text__name">{user.name}님</span>
          </>
        )}
      </div>
      <ul className="list__setting">
        <li className="list-item">
          <p className="text__title">화면</p>
          <div className="box__detail-option">
            {AuthApi.settingData.screen.map((data, idx) => {
              return (
                <OptionComponent
                  data={data}
                  themeEvent={props.themeEvent}
                  theme={props.theme}
                  key={idx}
                />
              );
            })}
          </div>
        </li>
        <li className="list-item">
          <p className="text__title">음성 및 효과음</p>
          <div className="box__detail-option">
            {AuthApi.settingData.voice.map((data, idx) => {
              return <OptionComponent data={data} key={idx} />;
            })}
          </div>
        </li>
        <li className="list-item">
          <p className="text__title">학습 리포트</p>
        </li>
        {user.name && (
          <li className="list-item">
            <button type="button" onClick={handleLogoutClick}>
              로그아웃
            </button>
          </li>
        )}
      </ul>
    </Container>
  );
};

export default Setting;
