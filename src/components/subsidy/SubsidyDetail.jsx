import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as SubsidyApi from "../../api/subsidy";
import { useEffect, useState } from "react";

const SubsidyDetail = () => {
  const param = useParams();
  const [service, setService] = useState();

  const getData = async (searchId) => {
    try {
      const response = await SubsidyApi.getServiceDetail(searchId);
      setService(response);

      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(param.id);
  }, []);

  return (
    <Container className="page__sub page__subsidy">
      {service ? (
        <div className="box__inner">
          <div className="box__detail">
            <div className="box__component-title-wrap">
              <div className="box__component-title">
                <div className="box__tags">
                  {service.supportType.split("||").map((supportType, idx) => {
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
                <h2 className="text__h2">{service.serviceName}</h2>
                <p className="text__sub">{service.servicePurpose}</p>
                <p className="text__date">
                  작성일 : {service.lastModifiedDate}
                </p>
              </div>
            </div>

            <ul className="list__detail">
              <li className="list-item">
                <span className="text__title">지원내용</span>
                <span className="text">
                  {service.supportDetails
                    .replaceAll("○", "·")
                    .replaceAll("ㅇ", "·")}
                </span>
              </li>
              <li className="list-item">
                <span className="text__title">지원대상자</span>
                <span className="text">
                  {service.eligibleRecipients
                    .replaceAll("○", "·")
                    .replaceAll("ㅇ", "·")}
                </span>
              </li>
              <li className="list-item">
                <span className="text__title">신청기한</span>
                <span className="text">{service.applicationPeriod}</span>
              </li>
              <li className="list-item">
                <span className="text__title">신청방법</span>
                <span className="text">
                  {service.applicationMethod
                    .replaceAll("○", "·")
                    .replaceAll("ㅇ", "·")}
                </span>
              </li>
              <li className="list-item">
                <span className="text__title">소관기관</span>
                <span className="text">{service.responsibleAgencyName}</span>
              </li>
              <li className="list-item">
                <span className="text__title">전화문의</span>
                <span className="text">{service.contactInfo}</span>
              </li>
              {service.localRegulation && (
                <li className="list-item">
                  <span className="text__title">자치법규</span>
                  <span className="text">{service.localRegulation}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text__empty">해당 상세 정보는 없습니다.</p>
      )}
    </Container>
  );
};

export default SubsidyDetail;
