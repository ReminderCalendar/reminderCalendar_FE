const CLIENT_ID = import.meta.env.VITE_REACT_APP_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=kakao`;
