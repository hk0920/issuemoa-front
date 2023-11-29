import { Cookies } from "react-cookie";
import * as AxiosUtil from '../lib/AxiosUtil';

const cookies = new Cookies();
const base = '/voca-api';

export async function save(data: object) {
  if (cookies.get("accessToken")) {
    await AxiosUtil.send('POST', `${base}/learn`, data, 'json');
  }
}

export async function countLearn():Promise<any> {
  if (cookies.get("accessToken")) {
    return await AxiosUtil.send('GET', `${base}/countLearn`, {}, '');
  }
}

