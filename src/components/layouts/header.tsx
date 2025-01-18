import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import WeatherComponent from "../more/fragments/weather";
import {
  person,
  person_fill,
  person_theme,
  person_fill_theme,
} from "../../images";

interface themeType {
  theme: boolean;
}
const Header = ({ theme }: themeType) => {
  const location = useLocation();
  const [isMain, setIsMain] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [location]);

  return (
    <header className={classNames("box__header", !isMain && "sub")}>
      <div className="box__inner">
        <h1 className="logo">
          <Link to="/">
            <span className="for-a11y">이슈모아 홈으로 이동</span>
          </Link>
        </h1>

        <WeatherComponent />
        <Link to="mypage" className="link__myg">
          <img
            src={theme ? person_fill_theme : person_fill}
            alt="마이페이지"
            className="icon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
