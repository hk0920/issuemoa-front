import { Cookies } from "react-cookie";
import * as AxiosUtil from "../lib/AxiosUtil";

const cookies = new Cookies();
const backendUrl = "/backend";

let email = "";
let name = "";
let gradeCode = "";

function setUserInfo(user: any) {
  email = user.email;
  name = user.name;
  gradeCode = user.gradeCode;
}

async function getUserInfo() {
  const response = await AxiosUtil.send("GET", `${backendUrl}/users`, {}, "");
  if (response) {
    setUserInfo(response);
  } else {
    cookies.remove("access_token");
  }
}

async function reissue() {
  const response = await AxiosUtil.send(
    "POST",
    `${backendUrl}/users/reissue`,
    {},
    ""
  );

  if (response) {
    setUserInfo(response);
    cookies.set("access_token", response.accessToken, {
      path: "/",
    });
    cookies.set("authorization", true, {
      path: "/",
    });
  } else {
    cookies.remove("authorization");
  }
}

export async function userReissue() {
  await reissue();
}

export async function userSignOut() {
  const isSignOut = await AxiosUtil.send(
    "GET",
    `${backendUrl}/users/signOut`,
    {},
    ""
  );
  if (isSignOut) {
    cookies.remove("access_token");
    cookies.remove("authorization");
  }

  return isSignOut;
}

export async function authInit(): Promise<boolean> {
  if (cookies.get("access_token") && cookies.get("authorization")) {
    await getUserInfo();
  } else if (!cookies.get("access_token") && cookies.get("authorization")) {
    await reissue();
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

export async function getGradeCode(): Promise<string> {
  await authInit();
  return gradeCode;
}

export const settingData = {
  screen: [
    {
      title: "테마",
      titleCode: "theme",
      optionList: [
        {
          code: "D",
          name: "다크",
        },
        {
          code: "W",
          name: "화이트",
        },
      ],
    },
  ],
  voice: [
    {
      title: "음성",
      titleCode: "voice",
      optionList: [
        {
          code: "W",
          name: "여성",
        },
        {
          code: "M",
          name: "남성",
        },
      ],
    },
    {
      title: "속도",
      titleCode: "speed",
      optionList: [
        {
          code: "S",
          name: "느리게",
        },
        {
          code: "N",
          name: "보통",
        },
        {
          code: "F",
          name: "빠르게",
        },
      ],
    },
    {
      title: "언어",
      titleCode: "lang",
      optionList: [
        {
          code: "KR",
          name: "한국어",
        },
        {
          code: "EN",
          name: "영어",
        },
      ],
    },
  ],
};

export async function settingTheme() {
  cookies.set(
    "theme",
    cookies.get("theme")
      ? cookies.get("theme")
      : settingData.screen[0].optionList[0].code
  );
  cookies.set("voice", "W");
  cookies.set("speed", "N");
  cookies.set("lang", "KR");
}
