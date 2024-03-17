import * as AxiosUtil from "../lib/AxiosUtil";

const backendUrl = "/backend";

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

export async function saveFavoriteData(boardId: string) {
  return await AxiosUtil.send(
    "POST",
    `${backendUrl}/board/favorite`,
    { boardId: boardId },
    "json"
  );
}
