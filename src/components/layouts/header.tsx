import { Link } from "react-router-dom";
import "../../styles/header.css";

const Header = () =>{
	return (
		<>
			<h1 className="logo">
				<Link to="/">이슈모아 홈으로 이동</Link>
			</h1>
		</>
	)
}

export default Header;