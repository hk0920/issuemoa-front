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

interface gradeType {
  code: string;
  icon: string;
  text: string;
}

export const gradeArray: Array<gradeType> = [
  { code: "C", icon: grade_ch, text: "Grade CH" },
  { code: "GM", icon: grade_gm, text: "Grade GM" },
  { code: "M", icon: grade_m, text: "Grade M" },
  { code: "D", icon: grade_dia, text: "Grade DIA" },
  { code: "P", icon: grade_plt, text: "Grade PLT" },
  { code: "G", icon: grade_gd, text: "Grade GD" },
  { code: "S", icon: grade_sl, text: "Grade SL" },
  { code: "B", icon: grade_br, text: "Grade BR" },
  { code: "I", icon: grade_ir, text: "Grade IR" },
];

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

            return (
              <li key={idx} className="list-item">
                <div className="box__icon">
                  <Image
                    src={gradeArray.find((obj) => obj.code === gradeCode)?.icon}
                    alt={
                      gradeArray.find((obj) => obj.code === gradeCode)?.text +
                      "등급 이미지"
                    }
                    className="image"
                  />
                </div>
                <div className="box__info">
                  <p className="text__title">
                    {gradeArray.find((obj) => obj.code === gradeCode)?.text}
                  </p>
                  <p className="text__desc">
                    {gradeArray.find((obj) => obj.code === gradeCode)?.text}
                    등급은 {standard}개 이상 일 경우 승급
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
