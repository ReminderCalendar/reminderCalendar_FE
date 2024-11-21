import React from 'react';
import GoogleLogo from '../../assets/google_logo.png';
import ReminderCalendarLogo from '../../assets/reminder.png';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Link,
} from '@mui/material';
import { DialogBox, BtnBox, SignText } from './LoginModalStyle';
import { KAKAO_AUTH_URL } from '../../util/getAuthorizationCode';
import { GOOGLE_AUTH_URL } from '../../util/getAuthorizationCode';
//import { NAVER_AUTH_URL } from '../../util/getAuthorizationCode';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../recoil/login/loginModalAtoms';

const LoginModal = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <Dialog
      open={isModalOpen}
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
          <Link href={GOOGLE_AUTH_URL} underline="none">
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
          </Link>
        </DialogContent>
      </DialogBox>
    </Dialog>
  );
};

export default LoginModal;
