import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import {
  home,
  home_fill,
  home_theme,
  home_fill_theme,
  word,
  word_fill,
  word_theme,
  word_fill_theme,
  tech,
  tech_fill,
  tech_theme,
  tech_fill_theme,
  person,
  person_fill,
  person_theme,
  person_fill_theme,
  more,
  more_fill,
  more_theme,
  more_fill_theme,
} from "../../images";

interface themeType {
  theme: boolean;
}

const Footer = ({ theme }: themeType) => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleMenuClick = (path: string) => {
    if (selected === "/") {
      cookies.set("issue_scrollY", window.scrollY);
    } else if (selected === "tech") {
      cookies.set("tech_scrollY", window.scrollY);
    }
    setSelected(path);
    navigate(path);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setSelected("/");
    } else if (pathname === "/login") {
      setSelected("mypage");
    }
  }, [selected]);

  return (
    <footer>
      <div className="box__inner">
        <Link
          to="/"
          className="link__footer"
          onClick={() => handleMenuClick("/")}
        >
          <img
            src={
              selected === "/"
                ? theme
                  ? home_fill_theme
                  : home_fill
                : theme
                ? home_theme
                : home
            }
            alt="Home"
            className="icon"
          />
          <span className="text">홈</span>
        </Link>
        <Link
          to="word"
          className="link__footer"
          onClick={() => handleMenuClick("word")}
        >
          <img
            src={
              selected === "word"
                ? theme
                  ? word_fill_theme
                  : word_fill
                : theme
                ? word_theme
                : word
            }
            alt="Word"
            className="icon"
          />
          <span className="text">Word</span>
        </Link>
        <Link
          to="tech"
          className="link__footer"
          onClick={() => handleMenuClick("tech")}
        >
          <img
            src={
              selected === "tech"
                ? theme
                  ? tech_fill_theme
                  : tech_fill
                : theme
                ? tech_theme
                : tech
            }
            alt="Tech"
            className="icon"
          />
          <span className="text">Tech</span>
        </Link>
        <Link
          to="mypage"
          className="link__footer"
          onClick={() => handleMenuClick("mypage")}
        >
          <img
            src={
              selected === "mypage"
                ? theme
                  ? person_fill_theme
                  : person_fill
                : theme
                ? person_theme
                : person
            }
            alt="Person"
            className="icon"
          />
          <span className="text">MY</span>
        </Link>
        <Link
          to="more"
          className="link__footer"
          onClick={() => handleMenuClick("more")}
        >
          <img
            src={
              selected === "more"
                ? theme
                  ? more_fill_theme
                  : more_fill
                : theme
                ? more_theme
                : more
            }
            alt="More"
            className="icon"
          />
          <span className="text">더보기</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
