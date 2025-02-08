import { Cookies } from "react-cookie";
import * as AxiosUtil from "../lib/AxiosUtil";

const cookies = new Cookies();
const backendUrl = "/backend";

// 사용자 정보 저장
let email = "";
let name = "";
let gradeCode = "";

// 14일 (초 단위)
const AUTH_MAX_AGE = 14 * 24 * 60 * 60; 

function setUserInfo(user: any | null) {
  if (user) {
    email = user.email;
    name = user.name;
    gradeCode = user.gradeCode;
  } else {
    email = "";
    name = "";
    gradeCode = "";
  }
}

// 인증 관련 쿠키 삭제
function clearAuthCookies() {
  cookies.remove("access_token");
  cookies.remove("authorization");
}

// 사용자 정보 가져오기
async function getUserInfo() {
  const response = await AxiosUtil.send("GET", `${backendUrl}/users`);
  response ? setUserInfo(response) : clearAuthCookies();
}

// 토큰 재발급
async function reissue() {
  const response = await AxiosUtil.send("POST", `${backendUrl}/users/reissue`);
  response ? setAuthToken(response.accessToken) : clearAuthCookies();
}

// 인증 초기화
async function authInit(): Promise<boolean> {
  if (cookies.get("access_token")) {
    await getUserInfo();
  } else if (cookies.get("authorization")) {
    await reissue();
  } else {
    return false;
  }
  return true;
}

// 로그아웃
export async function userSignOut() {
  const isSignOut = await AxiosUtil.send("GET", `${backendUrl}/users/signOut`);
  if (isSignOut) clearAuthCookies();
  return isSignOut;
}

// 사용자 인증 확인
export const checkUserAuthentication = authInit;

// 사용자 정보 반환 함수
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

// 설정 데이터
export const settingData = {
  screen: [
    {
      title: "테마",
      titleCode: "theme",
      optionList: [
        { code: "D", name: "다크" },
        { code: "W", name: "화이트" },
      ],
    },
  ],
  voice: [
    {
      title: "음성",
      titleCode: "voice",
      optionList: [
        { code: "W", name: "여성" },
        { code: "M", name: "남성" },
      ],
    },
    {
      title: "속도",
      titleCode: "speed",
      optionList: [
        { code: "S", name: "느리게" },
        { code: "N", name: "보통" },
        { code: "F", name: "빠르게" },
      ],
    },
    {
      title: "언어",
      titleCode: "lang",
      optionList: [
        { code: "KR", name: "한국어" },
        { code: "EN", name: "영어" },
      ],
    },
  ],
};

// 설정 초기화
export function initializeSettings() {
  cookies.set(
    "theme",
    cookies.get("theme") || settingData.screen[0].optionList[0].code
  );
  cookies.set("voice", "W");
  cookies.set("speed", "N");
  cookies.set("lang", "KR");
}

// 인증 토큰 저장
export function setAuthToken(token: string) {
  cookies.set("access_token", token, { path: "/", maxAge: 1800 });
  cookies.set("authorization", true, { path: "/", maxAge: AUTH_MAX_AGE });
}
