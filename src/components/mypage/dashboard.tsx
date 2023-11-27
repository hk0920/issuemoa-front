import { useState, useEffect } from "react";
import { google, kakao, naver } from '../../images';
import './login.css';
import * as AxiosUtil from '../../lib/AxiosUtil';
import { Cookies } from "react-cookie";

const Dashboard = () => {
  const cookies = new Cookies();
  const restKey = process.env.REACT_APP_KAKAO_REST_KEY;
  const redirectUrl = 'http://localhost:3000/login';

  return (
    <div className="login-container">
      <p>대시보드</p>
    </div>
  );
}

export default Dashboard;
