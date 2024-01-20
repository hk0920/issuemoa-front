import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Footer, Issue, Quiz, Login, Dashboard, More, Grade, Notice, Inquiry } from "./components";
import { Container, Spinner } from "react-bootstrap";
import * as AuthApi from "./api/auth";

const PrivateRoute = ({ element, requiredRole }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AuthApi.checkUserAuthentication();
      console.log("==> isAuthenticated : " + isAuthenticated);
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    // 로딩 중일 때의 처리
    return (
      <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
};

function App() {
  // const [isFixed, setIsFixed] = useState<boolean>(false);
  const isFixed = true;

  // window.addEventListener("scroll", (e) => {
  //   if (window.scrollY > 60) {
  //     setIsFixed(true);
  //   } else {
  //     setIsFixed(false);
  //   }
  // });

  return (
    <BrowserRouter>
      <Header isFixed={isFixed} />
      <Routes>
        <Route path="/" element={<Issue isFixed={isFixed} />} />
        <Route path="/word" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more" element={<More />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/mypage" element={<PrivateRoute element={<Dashboard />} requiredRole="user" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
