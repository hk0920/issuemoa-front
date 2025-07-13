import * as AxiosUtil from "../lib/AxiosUtil";

const backendUrl = "/backend";

interface categoryType {
  offset: number;
  limit: number;
  eligibleRecipients?: string;
  serviceCategoryList?: string;
  supportType?: string;
}

export async function getServiceCategoryList(data: categoryType): Promise<any> {
  const {
    offset,
    limit,
    eligibleRecipients,
    serviceCategoryList,
    supportType,
  } = data || {};

  return await AxiosUtil.send(
    "GET",
    `${backendUrl}/subsidy/${offset}/${limit}?eligibleRecipients=${eligibleRecipients}&serviceCategoryList=${serviceCategoryList}&supportType=${supportType}`
  );
}
