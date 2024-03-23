import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { google, kakao, naver } from "../../images";
import "./login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  let baseUrl = "http://127.0.0.1:3000";

  if (window.location.host.indexOf("issuemoa.kr") > -1) {
    baseUrl = "https://issuemoa.kr";
  }

  const navigate = useNavigate();

  const handleLoginClick = (handler: string) => {
    if (handler === "kakao") {
      window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
    } else if (handler === "google") {
      window.location.href = `${baseUrl}/oauth2/authorization/google`;
    }
  };

  useEffect(() => {
    const urlString = window.location.href;
    const tokenRegex = /token=([^&]+)/;
    const match = urlString.match(tokenRegex);

    if (match) {
      const token = match[1];
      if (token) {
        cookies.set("access_token", token, {
          path: "/"
        });
        cookies.set("authorization", true, {
          path: "/",
          maxAge: 3600
        });
        navigate("/mypage");
      }
    } else {
      console.log("Code not found in the URL.");
    }
  }, []);
 
  return (
    <div className="login-container">
      {loading && <Spinner animation="border" variant="primary" />}
      <div className="social-icon-container" onClick={() => handleLoginClick("kakao")}>
        <img src={kakao} alt="Kakao" className="social-icon" />
        <p className="icon-text">Kakao 로그인</p>
      </div>
      <div className="social-icon-container" onClick={() => handleLoginClick("google")}>
        <img src={google} alt="Google" className="social-icon" />
        <p className="icon-text">Google 로그인</p>
      </div>
      {/* 
      <div className="social-icon-container" onClick={() => handleLoginClick("naver")}>
        <img src={naver} alt="Naver" className="social-icon" />
        <p className="icon-text">Naver 로그인</p>
      </div>
      */}

    </div>
  );
}

export default Login;
