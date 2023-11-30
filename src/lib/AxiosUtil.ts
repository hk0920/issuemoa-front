import axios from "axios";
import { Cookies } from "react-cookie";
import * as AuthApi from "../api/auth";

axios.defaults.withCredentials = true;
const cookies = new Cookies();

export async function send(method: string, url: string, param: object, contentType: string): Promise<any> {
  console.log("==> AxiosUtil Send URL: " + url);
  if (url.indexOf("-api") > -1) {
    axios.defaults.headers.common["X-CLIENT-KEY"] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";
    axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.get("accessToken");
  } else if (url.indexOf("kapi") > -1) {
    axios.defaults.headers.common["X-CLIENT-KEY"] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";
    axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.get("kakaoAccessToken");
  } else {
    axios.defaults.headers.common["X-CLIENT-KEY"] = "";
    axios.defaults.headers.common["Authorization"] = "";
  }

  try {
    if (method === "GET") {
      const response = await axios.get(url, { params: param });
      return response.data;
    } else if (method === "POST") {
      const response = await axios.post(url, param, {
        headers: { "Content-Type": contentType === "json" ? "application/json" : "application/x-www-form-urlencoded" },
      });
      return response.data;
    }
  } catch (error) {
    console.error("==> AxiosUtil ERROR: ", error);
    throw error;
  }
}
