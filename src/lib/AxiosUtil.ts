import axios from "axios";
import { Cookies } from "react-cookie";

axios.defaults.withCredentials = true;
const cookies = new Cookies();

export async function send(method: string, url: string, param: object, contentType: string): Promise<any> {
  console.log("==> [AxiosUtil] API:", url);
  
  axios.defaults.headers.common["X-CLIENT-KEY"] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";

  if (url.indexOf("backend") > -1) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.get("access_token");
  } else if (url.indexOf("kapi") > -1) {
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
  } catch (error: any) {
    console.log("==> [AxiosUtil] ERROR:", error);
  }
}