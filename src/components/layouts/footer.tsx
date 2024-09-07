import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import {
  home,
  home_fill,
  home_thema,
  home_fill_thema,
  word,
  word_fill,
  word_thema,
  word_fill_thema,
  tech,
  tech_fill,
  tech_thema,
  tech_fill_thema,
  person,
  person_fill,
  person_thema,
  person_fill_thema,
  more,
  more_fill,
  more_thema,
  more_fill_thema,
} from "../../images";

interface themaType {
  thema: boolean;
}

const Footer = ({ thema }: themaType) => {
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
                ? thema
                  ? home_fill_thema
                  : home_fill
                : thema
                ? home_thema
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
                ? thema
                  ? word_fill_thema
                  : word_fill
                : thema
                ? word_thema
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
                ? thema
                  ? tech_fill_thema
                  : tech_fill
                : thema
                ? tech_thema
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
                ? thema
                  ? person_fill_thema
                  : person_fill
                : thema
                ? person_thema
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
                ? thema
                  ? more_fill_thema
                  : more_fill
                : thema
                ? more_thema
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
