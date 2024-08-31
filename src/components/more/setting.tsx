import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { gradeArray } from "./grade";
import * as AuthApi from "../../api/auth";

interface optionType {
  title: string;
  optionList: Array<string>;
}

const screenData = [
  {
    title: "테마",
    optionList: ["화이트", "블랙"],
  },
];
const soundData = [
  {
    title: "음성",
    optionList: ["여성", "남성"],
  },
  {
    title: "속도",
    optionList: ["느리게", "보통", "빠르게"],
  },
  {
    title: "언어",
    optionList: ["한국어", "영어", "일본어"],
  },
];

const OptionComponent = (props: any) => {
  const { title, optionList } = props.data || {};
  return (
    <div className="box__option">
      <p className="text__title">{title}</p>
      <select name={title} className="box__select">
        {optionList.map((option: string, idx: number) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Setting = () => {
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
          <Link to="">화면</Link>
          <div className="box__detail-option">
            {screenData.map((data, idx) => {
              return <OptionComponent data={data} key={idx} />;
            })}
          </div>
        </li>
        <li className="list-item">
          <Link to="">음성 및 효과음</Link>
          <div className="box__detail-option">
            {soundData.map((data, idx) => {
              return <OptionComponent data={data} key={idx} />;
            })}
          </div>
        </li>
        <li className="list-item">
          <Link to="">학습 리포트</Link>
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
