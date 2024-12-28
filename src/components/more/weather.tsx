import { Container } from "react-bootstrap";
import WeatherComponent from "./fragments/weather";
import { cloud } from "../../images";

const Weather = () => {
  return (
    <Container className="page__sub">
      <WeatherComponent type={"content"} />
      <div className="box__inner">
        <ul className="list__weather-week">
          <li className="list-item">
            <p className="text__day">일</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">월</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">화</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">수</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">목</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">금</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
          <li className="list-item">
            <p className="text__day">토</p>
            <p className="text__temp">0°</p>
            <img src={cloud} alt="" className="image" />
          </li>
        </ul>
      </div>
    </Container>
  );
};
export default Weather;
