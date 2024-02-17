import { Cookies } from "react-cookie";
import * as AxiosUtil from "../lib/AxiosUtil";

const cookies = new Cookies();
const baseUrl = "/board-api";

export async function getNewsList(skip: number, limit: number): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${baseUrl}/board/news`,
    { skip: skip, limit: limit },
    ""
  );
}

export async function getYoutubeList(
  skip: number,
  limit: number
): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${baseUrl}/board/youtube`,
    { skip: skip, limit: limit },
    ""
  );
}

export async function getFavoriteList() {
  return await AxiosUtil.send("GET", `${baseUrl}/board/favorite`, {}, "");
}

export async function saveFavoriteData(boardId: string) {
  return await AxiosUtil.send(
    "POST",
    `${baseUrl}/board/favorite`,
    { boardId: boardId },
    "json"
  );
}
