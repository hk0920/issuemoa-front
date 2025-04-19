import * as AxiosUtil from "../lib/AxiosUtil";

const backendUrl = "/backend";

export async function getStoreList(addr: string): Promise<any> {
  return await AxiosUtil.send("GET", `${backendUrl}/stores/${addr}`);
}

export async function getProductsList(entpId: number): Promise<any> {
  return await AxiosUtil.send("GET", `${backendUrl}/stores/products/${entpId}`);
}
