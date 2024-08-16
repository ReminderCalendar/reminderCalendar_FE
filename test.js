import React, { useEffect, useState } from 'react';
import axios from 'axios';
import kakaoLogo from './kakao_logo.png';
import naverLogo from './naver_logo.png';
import googleLogo from './google_logo.png';

const App = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const [kakaoLoginResponse, setKakaoLoginResponse] = useState(null);
  const [naverLoginResponse, setNaverLoginResponse] = useState(null);
  const [googleLoginResponse, setGoogleLoginResponse] = useState(null);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=kakao`;
    window.location.href = kakaoAuthUrl;
  };

  const handleNaverLogin = () => {
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=naver`;
    window.location.href = naverAuthUrl;
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline&state=google`;
    window.location.href = googleAuthUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      if (state === 'kakao') {
        fetchKakaoToken(code);
      } else if (state === 'naver') {
        fetchNaverToken(code, state);
      } else if (state === 'google') {
        fetchGoogleToken(code);
      }
    }
  }, []);

  const fetchKakaoToken = async code => {
    try {
      const response = await axios.get(
        `http://13.209.245.142:8080/api/login/kakao?code=${code}`,
      );
      setKakaoLoginResponse(response.data);
      window.history.pushState({}, document.title, '/'); // URL에서 code 파라미터 제거
    } catch (error) {
      console.error('Failed to fetch Kakao token', error);
    }
  };

  const fetchNaverToken = async (code, state) => {
    try {
      const response = await axios.get(
        `http://13.209.245.142:8080/api/login/naver?code=${code}&state=${state}`,
      );
      setNaverLoginResponse(response.data);
      window.history.pushState({}, document.title, '/'); // URL에서 code 파라미터 제거
    } catch (error) {
      console.error('Failed to fetch Naver token', error);
    }
  };

  const fetchGoogleToken = async code => {
    try {
      const response = await axios.get(
        `http://13.209.245.142:8080/api/login/google?code=${code}`,
      );
      setGoogleLoginResponse(response.data);
      window.history.pushState({}, document.title, '/'); // URL에서 code 파라미터 제거
    } catch (error) {
      console.error('Failed to fetch Google token', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '20px',
      }}
    >
      <div style={{ margin: '10px' }}>
        <img
          src={kakaoLogo}
          alt="카카오 로그인"
          style={{ cursor: 'pointer', width: '50px' }}
          onClick={handleKakaoLogin}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <img
          src={naverLogo}
          alt="네이버 로그인"
          style={{ cursor: 'pointer', width: '50px' }}
          onClick={handleNaverLogin}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <img
          src={googleLogo}
          alt="구글 로그인"
          style={{ cursor: 'pointer', width: '50px' }}
          onClick={handleGoogleLogin}
        />
      </div>
      {kakaoLoginResponse && (
        <div style={{ margin: '20px' }}>
          <h1>카카오 로그인 결과</h1>
          <p>Access Token: {kakaoLoginResponse.accessToken}</p>
          <p>Refresh Token: {kakaoLoginResponse.refreshToken}</p>
          <p>ID: {kakaoLoginResponse.id}</p>
          <p>Name: {kakaoLoginResponse.name}</p>
        </div>
      )}
      {naverLoginResponse && (
        <div style={{ margin: '20px' }}>
          <h1>네이버 로그인 결과</h1>
          <p>Access Token: {naverLoginResponse.accessToken}</p>
          <p>Refresh Token: {naverLoginResponse.refreshToken}</p>
          <p>ID: {naverLoginResponse.id}</p>
          <p>Name: {naverLoginResponse.name}</p>
        </div>
      )}
      {googleLoginResponse && (
        <div style={{ margin: '20px' }}>
          <h1>구글 로그인 결과</h1>
          <p>Access Token: {googleLoginResponse.accessToken}</p>
          <p>Refresh Token: {googleLoginResponse.refreshToken}</p>
          <p>ID: {googleLoginResponse.id}</p>
          <p>Name: {googleLoginResponse.name}</p>
        </div>
      )}
    </div>
  );
};

export default App;
