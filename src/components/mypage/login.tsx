import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { google, kakao, naver } from "../../images";
import * as AxiosUtil from "../../lib/AxiosUtil";
import "./login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const restKey = process.env.REACT_APP_KAKAO_REST_KEY;
  let redirectUrl = "http://localhost:3000/login";

  if (window.location.host.indexOf("issuemoa.kr") > -1) {
    redirectUrl = "https://issuemoa.kr/login";
  }

  const navigate = useNavigate();

  const handleLoginClick = (handler: string) => {
    if (handler === "kakao") {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restKey}&redirect_uri=${redirectUrl}`;
    }
  };

  useEffect(() => {
    const urlString = window.location.href;
    const codeRegex = /code=([^&]+)/;
    const match = urlString.match(codeRegex);

    if (match) {
      const code = match[1];
      
      const fetchData = async () => {
        try {
          const data = {
            "grant_type": "authorization_code",
            "client_id": restKey,
            "redirect_uri": redirectUrl,
            "code": code
          };
          const kakaoTokenResponse = await AxiosUtil.send("POST", `/kakao/oauth/token`, data, "");
          if (kakaoTokenResponse) {
            cookies.set("kakaoAccessToken", kakaoTokenResponse.access_token, {
              path: "/",
              maxAge: kakaoTokenResponse.expires_in
            });

            const accountResponse = await AxiosUtil.send("GET", `/kapi/v2/user/me`, {}, "");
            if (accountResponse) {
              const account = accountResponse.kakao_account;
              const profile = account.profile;
              const user = {
                "uid": accountResponse.id,
                "name": profile.nickname,
                "email": account.email,
                "snsType": "kakao"
              }    

              const result = await AxiosUtil.send("POST", `/backend/users/signIn`, user, "json");
              if (result.accessToken) {
                cookies.set("accessToken", result.accessToken, {
                  path: "/",
                  maxAge: result.accessTokenExpires
                });
                cookies.set("authorization", true, {
                  path: "/"
                });
                navigate("/mypage");
              }
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      setLoading(true);
      fetchData();
      setLoading(false);
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
      {/* 
      <div className="social-icon-container" onClick={() => handleLoginClick("naver")}>
        <img src={naver} alt="Naver" className="social-icon" />
        <p className="icon-text">Naver 로그인</p>
      </div>
      <div className="social-icon-container" onClick={() => handleLoginClick("google")}>
        <img src={google} alt="Google" className="social-icon" />
        <p className="icon-text">Google 로그인</p>
      </div> */}

    </div>
  );
}

export default Login;
