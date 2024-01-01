import { Link } from "react-router-dom";
import classNames from "classnames";

interface propsType {
  isFixed: boolean;
}
const Header = (data: propsType) => {
  return (
    <header className={classNames("box__header", data.isFixed && "fixed")}>
      <div className="box__inner">
        <h1 className="logo">
          <Link to="/">
            <span className="for-a11y">이슈모아 홈으로 이동</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
