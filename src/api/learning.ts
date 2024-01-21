import * as AxiosUtil from '../lib/AxiosUtil';
import * as AuthApi from './auth';

// ====================================================================
// 보카 API 시작
// ====================================================================
const vocaApi = '/voca-api';

export async function getVocaList(paramOffset:number, limit:number):Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send('GET',`${vocaApi}/voca?offset=${paramOffset}&limit=${limit}`, {}, '');
}

export async function save(data: object) {
  const isAuthenticated = await AuthApi.checkUserAuthentication();
  if (isAuthenticated) {
    await AxiosUtil.send('POST', `${vocaApi}/voca-learn`, data, 'json');
  }
}

export async function countLearn():Promise<any> {
  return await AxiosUtil.send('GET', `${vocaApi}/voca-learn/count`, {}, '');
}


// ====================================================================
// 인터뷰 API 시작
// ====================================================================
const interviewApi = '/interview-api';

export async function getInterviewList(category:string):Promise<any> {
  await AuthApi.checkUserAuthentication();
  return await AxiosUtil.send('GET',`${interviewApi}/interview?category=${category}`, {}, '');
}