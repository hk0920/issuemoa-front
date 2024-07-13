import * as AxiosUtil from "../lib/AxiosUtil";
import * as AuthApi from "./auth";

import fs from "fs";
import path from "path";
import OpenAI from "openai";

// ====================================================================
// 보카 API 시작
// ====================================================================
const backendUrl = "/backend";

export async function getVocaList(
  paramOffset: number,
  limit: number
): Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/voca?offset=${paramOffset}&limit=${limit}`,
    {},
    ""
  );
}

export async function save(data: object) {
  const isAuthenticated = await AuthApi.checkUserAuthentication();
  if (isAuthenticated) {
    await AxiosUtil.send("POST", `${backendUrl}/voca-learn`, data, "json");
  }
}

export async function countLearn(): Promise<any> {
  return await AxiosUtil.send("GET", `${backendUrl}/voca-learn/count`, {}, "");
}

export async function getRetryVocaList(
  paramOffset: number,
  limit: number
): Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/voca/retry?offset=${paramOffset}&limit=${limit}`,
    {},
    ""
  );
}

// ====================================================================
// 인터뷰 API 시작
// ====================================================================
export async function getInterviewList(category: string): Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/interview?category=${category}`,
    {},
    ""
  );
}

export async function saveFavoriteInterview(
  interviewId: number,
  useYn: string
): Promise<any> {
  const data = {
    interviewId: interviewId,
    useYn: useYn,
  };

  const isAuthenticated = await AuthApi.checkUserAuthentication();
  if (isAuthenticated) {
    await AxiosUtil.send(
      "POST",
      `${backendUrl}/interview/favorites`,
      data,
      "json"
    );
  }
}

export async function getFavoriteInterview() {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/interview/favorites`,
    {},
    ""
  );
}

// ====================================================================
// 등급 API 시작
// ====================================================================
export async function getGradeList(): Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send("GET", `${backendUrl}/grade-exp`, {}, "");
}
