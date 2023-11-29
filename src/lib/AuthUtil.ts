import { Cookies } from "react-cookie";
import * as AxiosUtil from './AxiosUtil';

const cookies = new Cookies()
let email = "";
let name = "";
let authorization = false;

async function getUserInfo() {
  const response = await AxiosUtil.send("POST", "/users-api/users/reissue", {}, "");
  const data = response.data;
  console.log(data);
  if (data !== null) { 
    email = data.email;
    name = data.name;
    authorization = true;
    cookies.set("accessToken", data.accessToken, {
      path: "/"
    });
  }
}

export async function checkUserAuthentication():Promise<boolean> {
  await getUserInfo();
  return authorization;
}

export async function getName():Promise<string> {
  await getUserInfo();
  return name;
}

export async function getEmail():Promise<string> {
  await getUserInfo();
  return email;
}