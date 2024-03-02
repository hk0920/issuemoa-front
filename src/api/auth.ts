import { Cookies } from "react-cookie";
import * as AxiosUtil from "../lib/AxiosUtil";

const cookies = new Cookies();
const baseUrl = "/users-api";
let email = "";
let name = "";

async function getUserInfo() {
  const response = await AxiosUtil.send("GET", `${baseUrl}/users/info`, {}, "");
  if (response) {
    setUserInfo(response);
  } else {
    cookies.remove("accessToken");
  }
}

function setUserInfo(user: any) {
  email = user.email;
  name = user.name;
}

async function setReissue() {
  const response = await AxiosUtil.send(
    "POST",
    `${baseUrl}/users/reissue`,
    {},
    ""
  );

  if (response) {
    setUserInfo(response);
    cookies.set("accessToken", response.accessToken, {
      path: "/",
      maxAge: response.accessTokenExpires,
    });
    cookies.set("authorization", true, {
      path: "/",
    });
  } else {
    cookies.remove("authorization");
  }
}

export async function authInit(): Promise<boolean> {
  if (cookies.get("accessToken")) {
    await getUserInfo();
  } else if (cookies.get("authorization")) {
    await setReissue();
  } else {
    return false;
  }
  return true;
}

export async function checkUserAuthentication(): Promise<boolean> {
  return await authInit();
}

export async function getName(): Promise<string> {
  await authInit();
  return name;
}

export async function getEmail(): Promise<string> {
  await authInit();
  return email;
}
