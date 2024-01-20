import * as AxiosUtil from '../lib/AxiosUtil';
import * as AuthApi from './auth';

const base = '/voca-api';

export async function getList(paramOffset:number, limit:number):Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send('GET',`/voca-api/voca?offset=${paramOffset}&limit=${limit}`, {}, '');
}

export async function save(data: object) {
  const isAuthenticated = await AuthApi.checkUserAuthentication();
  if (isAuthenticated) {
    await AxiosUtil.send('POST', `${base}/voca-learn`, data, 'json');
  }
}

export async function countLearn():Promise<any> {
  return await AxiosUtil.send('GET', `${base}/voca-learn/count`, {}, '');
}