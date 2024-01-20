import { useState, useEffect } from "react";
import { cloud } from "../../images";
import { Container } from "react-bootstrap";
import { Dialog } from "../index";
import { useNavigate } from "react-router-dom";
import * as AuthApi from "../../api/auth";
import * as AxiosUtil from "../../lib/AxiosUtil";
import VocaWord from "./fragments/VocaWord";
import ComponentTitle from "./fragments/ComponentTitle";

interface Props {
  children: React.ReactNode;
}

interface Voca {
  id: number;
  word: string;
  mean: string;
}

function Quiz() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("확인");
  const [dialogContext, setDialogContext] = useState<string>("");
  const [dialogButtonText, setDialogButtonText] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [temp, setTemp] = useState<string>("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    setModalOpen(false);
    navigate("/mypage");
  };

  const getWeather = async () => {
    const getPosition = (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    try {
      const position = await getPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
      const url = `/weather-api/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
      const response = await AxiosUtil.send("GET", url, {}, "");
      const weather = response.weather[0];
      const icon = weather.icon;
      const temp = Math.round(response.main.temp) + "° " + weather.description;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      setWeather(iconURL);
      setTemp(temp);
    } catch (error) {
      console.error("Error getting geolocation or weather:", error);
    }
  };

  useEffect(() => {
    setWeather(cloud);
    getWeather();
  }, []);

  return (
    <Container className="page__sub page__voca">
      <div className="box__component-weather">
        <span className="text">{temp}</span>
        <img src={weather} alt="weather" className="image" />
      </div>
      <Dialog
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        title={dialogTitle}
        context={dialogContext}
        buttonText={dialogButtonText}
      />
      <div className="box__inner">
        <ComponentTitle
          title={"영어단어"}
          subTitle={"영어단어를 쉽고 간단하게 배워봅시다"}
        />

        <div className="box__select">
          <select name="" id="" className="form__select">
            <option value="영어단어">영어단어</option>
            <option value="영어단어">백앤드 기술용어</option>
            <option value="영어단어">프론트 기술용어</option>
          </select>
        </div>

        <VocaWord />
      </div>
    </Container>
  );
}

export default Quiz;
