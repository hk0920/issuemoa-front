import { Link } from "react-router-dom";

interface subsidyItem {
  registrationDatetime: string;
  departmentName: string;
  userType: string;
  detailViewUrl: string;
  serviceId: string;
  serviceName: string;
  servicePurposeSummary: string;
  serviceCategory: string;
  eligibilityCriteria: string;
  responsibleAgencyName: string;
  responsibleAgencyType: string;
  responsibleAgencyCode: string;
  lastModifiedDatetime: string;
  applicationPeriod: string;
  applicationMethod: string;
  contactInfo: string;
  receivingAgency: string;
  viewCount: string;
  supportDetails: string;
  eligibleRecipients: string;
  supportType: string;
}

interface dataType {
  data: subsidyItem[];
}

const SubsidyList = ({ data }: dataType) => {
  return (
    <>
      {data.length ? (
        <ul className="list__subsidy">
          {data.map((item) => {
            return (
              <li className="list-item" key={item.serviceId}>
                <Link
                  to={`/subsidy/detail/${item.serviceId}`}
                  className="link__detail"
                >
                  <div className="box__tags">
                    {item.serviceCategory && (
                      <span className="text__tag text__tag-categry">
                        {item.serviceCategory}
                      </span>
                    )}
                    {item.userType.split("||").map((userType, idx) => {
                      return (
                        <span
                          className="text__tag text__tag-user"
                          key={`user-type-${idx}`}
                        >
                          {userType}
                        </span>
                      );
                    })}
                    {item.supportType.split("||").map((supportType, idx) => {
                      return (
                        <span
                          className="text__tag text__tag-support"
                          key={`support-type-${idx}`}
                        >
                          {supportType}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text__name">{item.serviceName}</p>
                  <p className="text__desc">{item.servicePurposeSummary}</p>
                  <p className="text__date">
                    신청 기간 : {item.applicationPeriod}
                  </p>
                  <span className="box__view-count">
                    {Number(item.viewCount).toLocaleString()}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text__empty">조건에 맞는 사업 내역이 없습니다.</p>
      )}
    </>
  );
};

export default SubsidyList;
