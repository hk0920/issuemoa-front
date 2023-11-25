import axios from 'axios';
axios.defaults.withCredentials = true;

export function send(method:string, url:string, param:object, type:string, callback:Function) {
    axios.defaults.headers.common['X-CLIENT-KEY'] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";

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
        headers: { "Content-Type": type === "json" ? "application/json" : "multipart/form-data" }
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