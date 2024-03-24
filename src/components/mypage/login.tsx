import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { google, kakao, naver } from "../../images";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const baseUrl = "http://61.102.114.235:8000";

  const handleLoginClick = (handler: string) => {
    if (handler === "kakao") {
      window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
    } else if (handler === "google") {
      if (window.location.host.indexOf("issuemoa.kr") > -1) {
        window.location.href = `http://gate.issuemoa.kr:8000/oauth2/authorization/google`;
      } else {
        window.location.href = `${baseUrl}/oauth2/authorization/google`;
      }
    }
  };
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
        console.log("==> token:", token);
        console.log("==> refreshToken:", refreshToken);
        cookies.set("refresh_token", refreshToken, {
          path: "/",
        });
        cookies.set("access_token", token, {
          path: "/"
        });
        cookies.set("authorization", true, {
          path: "/",
          maxAge: 3600
        });
        navigate("/mypage");
    } else {
      console.log("Code not found in the URL.");
    }
  }, []);
 
  return (
    <div className="login-container">
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
