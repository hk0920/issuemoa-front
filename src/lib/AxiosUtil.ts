import axios from "axios";
import { Cookies } from "react-cookie";
import * as AuthApi from "../api/auth";

axios.defaults.withCredentials = true;
const cookies = new Cookies();

export async function send(
  method: string,
  url: string,
  param: object,
  contentType: string
): Promise<any> {
  
  if (window.location.href.indexOf("issuemoa") < 0) {
    console.log("==> [AxiosUtil] send(): ", url);
  }

  axios.defaults.headers.common["X-CLIENT-KEY"] =
    "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";

  const accessToken = cookies.get("access_token");

  if (url.indexOf("backend") > -1) {
    if (accessToken !== null && accessToken !== undefined) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + accessToken;
    } else {
      if (cookies.get("authorization")) {
        AuthApi.userReissue();
      }
    }
  } else if (url.indexOf("kapi") > -1) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + cookies.get("kakaoAccessToken");
  } else {
    axios.defaults.headers.common["X-CLIENT-KEY"] = "";
    axios.defaults.headers.common["Authorization"] = "";
  }

  try {
    if (method === "GET") {
      const response = await axios.get(url, { params: param });
      devTestConsole(method, response.data);
      return response.data;
    } else if (method === "POST") {
      const response = await axios.post(url, param, {
        headers: {
          "Content-Type":
            contentType === "json"
              ? "application/json"
              : "application/x-www-form-urlencoded",
        },
      });
      devTestConsole(method, response.data);
      return response.data;
    }
  } catch (error: any) {
    console.log("==> [AxiosUtil] ERROR:", error);
  }
}

const devTestConsole = (method: any, data: any) => {
  if (window.location.href.indexOf("issuemoa") < 0) {
    console.log("[ " + method + " ] START");
    console.log(data);
    console.log("[ " + method + " ] END");
  }
};
