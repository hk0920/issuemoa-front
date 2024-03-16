import { Container, Image } from "react-bootstrap";
import {
  grade_br,
  grade_ch,
  grade_dia,
  grade_gd,
  grade_gm,
  grade_ir,
  grade_m,
  grade_plt,
  grade_sl,
} from "../../images";
import { useEffect, useState } from "react";
import * as GradeApi from "../../api/learning";

const Grade = () => {
  const [gradeData, setGradeData] = useState([]);

  const fetchData = async () => {
    try {
      let response = await GradeApi.getGradeList();

      if (response) {
        setGradeData(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="page__sub">
      {gradeData.length > 0 ? (
        <ul className="list__grade">
          {gradeData.map((item, idx) => {
            const { gradeCode, id, modifyTime, registerTime, standard } =
              item || {};
            const grade =
              gradeCode === "C"
                ? "Grade CH"
                : gradeCode === "GM"
                ? "Grade GM"
                : gradeCode === "M"
                ? "Grade M"
                : gradeCode === "D"
                ? "Grade DIA"
                : gradeCode === "P"
                ? "Grade PLT"
                : gradeCode === "G"
                ? "Grade GD"
                : gradeCode === "S"
                ? "Grade SL"
                : gradeCode === "B"
                ? "Grade BR"
                : "Grade IR";

            return (
              <li key={idx} className="list-item">
                <div className="box__icon">
                  <Image
                    src={
                      gradeCode === "C"
                        ? grade_ch
                        : gradeCode === "GM"
                        ? grade_gm
                        : gradeCode === "M"
                        ? grade_m
                        : gradeCode === "D"
                        ? grade_dia
                        : gradeCode === "P"
                        ? grade_plt
                        : gradeCode === "G"
                        ? grade_gd
                        : gradeCode === "S"
                        ? grade_sl
                        : gradeCode === "B"
                        ? grade_br
                        : grade_ir
                    }
                    alt={`${grade} 등급 이미지`}
                    className="image"
                  />
                </div>
                <div className="box__info">
                  <p className="text__title">{grade}</p>
                  <p className="text__desc">
                    {grade}등급은 {standard}개 이상 일 경우 승급
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </Container>
  );
};

export default Grade;
