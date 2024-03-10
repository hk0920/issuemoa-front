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
  // 이미지와 설명을 나타내는 데이터 배열
  // const gradeData = [
  //   {
  //     image: grade_ch,
  //     grade: "Grade CH",
  //     description: "Grade CH 등급은 1000개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_gm,
  //     grade: "Grade GM",
  //     description: "Grade GM 등급은 700개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_m,
  //     grade: "Grade M",
  //     description: "Grade M 등급은 500개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_dia,
  //     grade: "Grade DIA",
  //     description: "Grade DIA 등급은 300개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_plt,
  //     grade: "Grade PLT",
  //     description: "Grade PLT 등급은 200개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_gd,
  //     grade: "Grade GD",
  //     description: "Grade GD 등급은 100개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_sl,
  //     grade: "Grade SL",
  //     description: "Grade SG 등급은 50개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_br,
  //     grade: "Grade BR",
  //     description: "Grade BR 등급은 20개 이상 일 경우 승급",
  //   },
  //   {
  //     image: grade_ir,
  //     grade: "Grade IR",
  //     description: "Grade IR 등급은 10개 이상 일 경우 승급",
  //   },
  // ];

  const fetchData = async () => {
    try {
      let response = await GradeApi.getGradeList();

      console.log(response);
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
