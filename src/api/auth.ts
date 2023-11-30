import { Cookies } from "react-cookie";
import * as AxiosUtil from '../lib/AxiosUtil';

const cookies = new Cookies();
const baseUrl = '/users-api';
let email = "";
let name = "";

async function getUserInfo() {
  const response = await AxiosUtil.send("GET", `${baseUrl}/users/info`, {}, "");
  const data = response.data;
  console.log("==> getUserInfo::");
  console.log(data)
  if (data) { 
    setUserInfo(data);
  } else {
    cookies.remove('accessToken');
  }
}

function setUserInfo(user:any) {
  email = user.email;
  name = user.name;
}

async function setReissue() {
  const response = await AxiosUtil.send("POST", `${baseUrl}/users/reissue`, {}, "");
  const data = response.data;
  console.log("==> setReissue::");
  console.log(data);
  if (data) {
    setUserInfo(data);
    cookies.set("accessToken", data.accessToken, {
      path: "/",
      maxAge: data.accessTokenExpires
    });
    cookies.set("authorization", true, {
      path: "/"
    });
  } else {
    cookies.remove('authorization');
  }
}

export async function authInit():Promise<boolean> {
  if (cookies.get('accessToken')) {
    await getUserInfo();
  } else if (cookies.get('authorization')) {
    await setReissue();
  } else {
    return false;
  }
  return true;
}

export async function checkUserAuthentication():Promise<boolean> {
  return await authInit();
}

export async function getName():Promise<string> {
  await authInit();
  return name;
}

export async function getEmail():Promise<string> {
  await authInit();
  return email;
}