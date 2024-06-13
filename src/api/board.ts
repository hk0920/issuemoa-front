import * as AxiosUtil from "../lib/AxiosUtil";

const backendUrl = "/backend";

interface Board {
  id: string;
  type: string;
  title: string;
  contents: string;
  url: string;
  thumbnail: string;
}

export async function getNewsList(skip: number, limit: number): Promise<any> {
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/board/news`,
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
    `${backendUrl}/board/youtube`,
    { skip: skip, limit: limit },
    ""
  );
}

export async function getFavoriteList() {
  return await AxiosUtil.send("GET", `${backendUrl}/board/favorite`, {}, "");
}

export async function saveFavoriteData(data: Board) {
  return await AxiosUtil.send(
    "POST",
    `${backendUrl}/board/favorites`,
    { data: data },
    "json"
  );
}
