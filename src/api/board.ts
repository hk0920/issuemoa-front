import * as AxiosUtil from "../lib/AxiosUtil";
import { Board } from "../types/board";

const backendUrl = "/backend";

export async function getNewsList(skip: number, limit: number): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/board/news`,
    { skip: skip, limit: limit }
  );
}

export async function getYoutubeList(
  skip: number,
  limit: number
): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/board/youtube`,
    { skip: skip, limit: limit }
  );
}

export async function getFavoriteList() {
  return await AxiosUtil.send("GET", `${backendUrl}/board/favorites`);
}

export async function saveFavoriteData(data: Board) {
  return await AxiosUtil.send(
    "POST",
    `${backendUrl}/board/favorites`,
    {
      id: data.id,
      type: data.type,
      title: data.title,
      contents: data.contents,
      url: data.url,
      thumbnail: data.thumbnail,
    },
    "json"
  );
}

export async function getKeywordData(minusday: number): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/keyword`,
    { minusDay: minusday }
  );
}
