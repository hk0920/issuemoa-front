import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Header,
  Footer,
  Issue,
  Quiz,
  Login,
  Dashboard,
  More,
  Grade,
  Notice,
  Inquiry,
  Tech,
  Setting,
} from "./components";
import { Container, Spinner } from "react-bootstrap";
import * as AuthApi from "./api/auth";
import Floating from "./components/layouts/floating";
import classNames from "classnames";
import { Cookies } from "react-cookie";

const PrivateRoute = ({ element, requiredRole }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AuthApi.checkUserAuthentication();
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    // 로딩 중일 때의 처리
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

function App() {
  const cookies = new Cookies();
  const [theme, setTheme] = useState(cookies.get("theme"));

  const themeEvent = () => {
    if (theme === "W") {
      cookies.set("theme", "D");
      setTheme("D");
    } else {
      cookies.set("theme", "W");
      setTheme("W");
    }
    console.log(cookies.get("theme"));
  };
  useEffect(() => {
    AuthApi.settingTheme();
  }, [theme]);
  return (
    <BrowserRouter>
      <div id="wrap" className={classNames(theme !== "W" && "theme-black")}>
        <Header />
        <Routes>
          <Route path="/" element={<Issue />} />
          <Route path="/word" element={<Quiz />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/login" element={<Login />} />
          <Route path="/more" element={<More theme={theme !== "W"} />} />
          <Route path="/grade" element={<Grade />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route
            path="/setting"
            element={<Setting theme={theme !== "W"} themeEvent={themeEvent} />}
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute element={<Dashboard />} requiredRole="user" />
            }
          />
        </Routes>
        <Footer theme={theme !== "W"} />
        <Floating />
      </div>
    </BrowserRouter>
  );
}

export default App;
