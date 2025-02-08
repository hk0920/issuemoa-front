import axios from "axios";
import { Cookies } from "react-cookie";
import * as AuthApi from "../api/auth";

axios.defaults.withCredentials = true;
const cookies = new Cookies();

// 공통 헤더 설정 함수
const getAuthorizationHeader = (url: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "X-CLIENT-KEY": "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA",
  };

  if (url.includes("backend")) {
    const accessToken = cookies.get("access_token");
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  } else if (url.includes("kapi")) {
    const kakaoToken = cookies.get("kakaoAccessToken");
    if (kakaoToken) headers["Authorization"] = `Bearer ${kakaoToken}`;
  }

  return headers;
};

// 콘솔 로깅 함수
const devTestConsole = (method: string, data: any) => {
  if (!window.location.href.includes("issuemoa")) {
    console.log(`[ ${method} ] START`);
    console.log(data);
    console.log(`[ ${method} ] END`);
  }
};

// HTTP 요청 함수
export async function send(
  method: "GET" | "POST",
  url: string,
  param: object = {},
  contentType: "json" | "form" = "json"
): Promise<any> {
  try {
    // 토큰 갱신 요청
    if (cookies.get("access_token") && cookies.get("authorization")) {
      await AuthApi.userReissue();
    }

    // 요청 헤더 설정
    axios.defaults.headers.common = getAuthorizationHeader(url);

    // 요청 실행
    const response =
      method === "GET"
        ? await axios.get(url, { params: param })
        : await axios.post(url, param, {
            headers: {
              "Content-Type":
                contentType === "json"
                  ? "application/json"
                  : "application/x-www-form-urlencoded",
            },
          });

    devTestConsole(method, response.data);
    return response.data;
  } catch (error: any) {
    console.error("==> [AxiosUtil] ERROR:", error);
    throw error; // 호출한 곳에서 에러 핸들링 가능하도록 예외 전달
  }
}
