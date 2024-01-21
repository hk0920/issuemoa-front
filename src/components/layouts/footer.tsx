import { useEffect, useState } from "react";
import { home, home_fill, word, word_fill, tech, tech_fill, person, person_fill, more, more_fill } from "../../images";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
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
  }, []);

  return (
    <footer>
      <div className="box__inner">
        <Link to="/" className="link__footer" onClick={() => handleMenuClick("/")}>
          <img src={selected === "/" ? home_fill : home} alt="Home" className="icon" />
          <span className="text">홈</span>
        </Link>
        <Link to="word" className="link__footer" onClick={() => handleMenuClick("word")}>
          <img src={selected === "word" ? word_fill : word} alt="Word" className="icon" />
          <span className="text">Word</span>
        </Link>
        <Link to="tech" className="link__footer" onClick={() => handleMenuClick("tech")}>
          <img src={selected === "tech" ? tech_fill : tech} alt="Tech" className="icon" />
          <span className="text">Tech</span>
        </Link>
        <Link to="mypage" className="link__footer" onClick={() => handleMenuClick("mypage")}>
          <img src={selected === "mypage" ? person_fill : person} alt="Person" className="icon" />
          <span className="text">MY</span>
        </Link>
        <Link to="more" className="link__footer" onClick={() => handleMenuClick("more")}>
          <img src={selected === "more" ? more_fill : more} alt="More" className="icon" />
          <span className="text">더보기</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
