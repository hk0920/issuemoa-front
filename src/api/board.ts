import { Cookies } from "react-cookie";
import * as AxiosUtil from '../lib/AxiosUtil';

const cookies = new Cookies();
const baseUrl = '/board-api';

export async function getNewsList(skip:number, limit: number):Promise<any> {
  return await AxiosUtil.send("GET", `${baseUrl}/board/news/list`, { "skip": skip, "limit": limit }, "");
}

export async function getYoutubeList(skip:number, limit: number):Promise<any> {
  return await AxiosUtil.send("GET", `${baseUrl}/board/youtube/list`, { "skip": skip, "limit": limit }, "");
}