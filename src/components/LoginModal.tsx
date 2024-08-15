import React from 'react';
import KakaoLogo from '../assets/kakao_login_large_narrow.png';
import GoogleLogo from '../assets/google_logo.png';
import ReminderCalendarLogo from '../assets/reminder.png';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Avatar,
  Dialog,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  Link,
} from '@mui/material';
import styled from '@emotion/styled';

import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../recoil/login/loginModalAtoms';

const CLIENT_ID = import.meta.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = import.meta.env.REACT_APP_REDIRECT_URL;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const DialogBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.5rem',
});

const BtnBox = styled(Box)({
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

const SignText = styled(Typography)({
  fontSize: '17px',

  alignItems: 'center',
  marginLeft: '20px',
});

const LoginModal = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      sx={{ '& .MuiDialog-paper': { borderRadius: '1rem' } }}
    >
      <div
        style={{
          display: 'flex',
          backgroundColor: '#e5384f',
          height: '3.5rem',
          width: '100%',
        }}
      >
        <IconButton
          onClick={() => setModalOpen(!isModalOpen)}
          sx={{
            margin: '0 1rem 0 auto',
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogBox
        sx={{
          backgroundColor: theme => theme.palette.primary.light,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={ReminderCalendarLogo} width="50px" height="50px" />
        </Box>
        <DialogTitle
          variant="h5"
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            width: '340px',
          }}
        >
          Reminder Calendar에 오신 것을 환영합니다.
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '4rem',
          }}
        >
          <Link href={KAKAO_AUTH_URL}>
            <BtnBox className="kakao_login_btn" />
          </Link>

          <BtnBox className="google_login_btn">
            <Avatar
              src={GoogleLogo}
              sx={{
                width: '22px',
                height: '22px',
              }}
            />
            <SignText>Login with Google</SignText>
          </BtnBox>
        </DialogContent>
      </DialogBox>
      {/* <div
        style={{
          backgroundColor: '#e5384f',
          height: '1.5rem',
          width: '100%',
        }}
      /> */}
    </Dialog>
  );
};

export default LoginModal;
