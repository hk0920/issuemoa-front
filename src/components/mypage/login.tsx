import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { google, kakao, naver } from "../../images";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  let baseUrl = "http://gate.issuemoa.kr:8000";

  const handleLoginClick = (handler: string) => {
    if (handler === "kakao") {
      window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
    } else if (handler === "google") {
      window.location.href = `${baseUrl}/oauth2/authorization/google`;
    }
  };
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
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
