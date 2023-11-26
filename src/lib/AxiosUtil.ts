
import axios from 'axios';
import { Cookies } from "react-cookie";

axios.defaults.withCredentials = true;
const cookies = new Cookies();

export function send(method:string, url:string, param:object, type:string, callback:Function) {
    if (url.indexOf("voca") > -1) {
      axios.defaults.headers.common['X-CLIENT-KEY'] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";
      axios.defaults.headers.common['Authorization'] = "Bearer " + cookies.get("accessToken");
    } else if (url.indexOf("kapi") > -1) {
      axios.defaults.headers.common['X-CLIENT-KEY'] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";
      axios.defaults.headers.common['Authorization'] = "Bearer " + cookies.get("kakaoAccessToken");
    } else {
      axios.defaults.headers.common['X-CLIENT-KEY'] = "";
      axios.defaults.headers.common['Authorization'] = "";
    }

  if (method === "GET") {
      axios.get(url, param)
      .then(function (response) {
        console.log("==> axios GET then");
        callback (response.data);
      })
      .catch(function (error) {
        console.log("==> axios GET error");
        console.log(error);
      });
  } else if (method === "POST") {
      axios.post(url, param, { 
        headers: { "Content-Type": type === "json" ? "application/json" : "application/x-www-form-urlencoded" }
      })
      .then(function (response) {
        console.log("==> axios POST then");
        callback (response.data);
      })
      .catch(function (error) {
        console.log("==> axios POST error");
        console.log(error);
      });
  } else {
    console.log("==> AxiosUtil Type Error!");
  }
}