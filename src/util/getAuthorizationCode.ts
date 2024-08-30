const KAKAO_CLIENT_ID = import.meta.env.VITE_REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URL;

const GOOGLE_REDIRECT_URI = import.meta.env.VITE_REACT_APP_GOOGLE_REDIRECT_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_REST_API_KEY;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=kakao`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`;
