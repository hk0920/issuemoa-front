import * as AxiosUtil from "../lib/AxiosUtil";

const backendUrl = "/backend";

interface categoryType {
  serviceCategoryList: string;
  offset: number;
  limit: number;
}
interface supportType {
  supportType: string;
  offset: number;
  limit: number;
}

export async function getServiceCategoryList(data: categoryType): Promise<any> {
  const { serviceCategoryList, offset, limit } = data || {};
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/subsidy/${serviceCategoryList}/${offset}/${limit}`
  );
}

export async function getSupportTypeList(data: supportType): Promise<any> {
  const { supportType, offset, limit } = data || {};
  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/subsidy/type/${supportType}/${offset}/${limit}`
  );
}

const category = [
  {
    id: "0-1",
    text: "고용·창업",
  },
  {
    id: "0-2",
    text: "농림축산어업",
  },
  {
    id: "0-3",
    text: "문화·환경",
  },
  {
    id: "0-4",
    text: "보건·의료",
  },
  {
    id: "0-5",
    text: "보육·교육",
  },
  {
    id: "0-6",
    text: "보호·돌봄",
  },
  {
    id: "0-7",
    text: "생활안정",
  },
  {
    id: "0-8",
    text: "임신·출산",
  },
  {
    id: "0-9",
    text: "주거·자립",
  },
  {
    id: "0-10",
    text: "행정·안전",
  },
];
