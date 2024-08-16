import { Box, Typography, styled } from '@mui/material';
import KakaoLogo from '../../assets/kakao_login_large_narrow.png';

export const DialogBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.5rem',
});

export const BtnBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '340px',
  height: '55px',

  border: '1px solid lightgrey',
  borderRadius: '12px',

  cursor: 'pointer',

  '&.google_login_btn': {
    backgroundColor: '#ffffff',
    marginTop: '1rem',

    ':hover': {
      border: '1.4px solid #4285F4',
    },
  },

  '&.kakao_login_btn': {
    backgroundImage: `url(${KakaoLogo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#FEE500',

    ':hover': {
      border: '1.4px solid black',
    },
  },
});

export const SignText = styled(Typography)({
  fontSize: '17px',

  alignItems: 'center',
  marginLeft: '20px',
});
