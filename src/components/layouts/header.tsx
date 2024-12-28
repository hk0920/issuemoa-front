import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import WeatherComponent from "../more/fragments/weather";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
