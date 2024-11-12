import React from 'react';
import { useNavigate } from 'react-router-dom';
import Reminder from '../../api/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { AccountBox } from '@mui/icons-material';
import EmailVerification from './components/EmailVerification';

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const [nickNameModalOpen, setNickNameModalOpen] = React.useState(false);

  React.useEffect(() => {
    const isMember = async () => {
      try {
        const { data } = await Reminder.get('/member');
        localStorage.setItem('active', data.active);
        navigate('/');
      } catch (err) {
        if (err.response.data.message === '회원이 활성화되어 있지 않습니다.') {
          localStorage.setItem('active', 'false');
          setNickNameModalOpen(true);
        }
      }
    };

    const kakaoLogin = async () => {
      try {
        const { data } = await Reminder.get(`/login/kakao?code=${code}`);
        localStorage.setItem('accessToken', data.accessToken);
        isMember();
      } catch (err) {
        console.error(err);
      }
    };

    const googleLogin = async () => {
      try {
        const { data } = await Reminder.get(`/login/google?code=${code}`);
        localStorage.setItem('accessToken', data.accessToken);
        isMember();
      } catch (err) {
        console.error(err);
      }
    };

    if (window.location.href.includes('kakao')) {
      kakaoLogin();
    } else if (window.location.href.includes('google')) {
      googleLogin();
    }
  }, [code, navigate]);

  const AddMemberInfo = () => {
    const [email, setEmail] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [verificationNum, setVerificationNum] = React.useState('');

    const handleClickCancel = () => {
      setNickNameModalOpen(false);
      navigate('/');
    };

    const handleSubmit = async () => {
      try {
        await Reminder.post('/email/activate', {
          email,
          username: nickname,
          verificationCode: verificationNum,
        });
        localStorage.setItem('active', 'true');
        window.location.replace('/');
      } catch (err) {
        window.alert('회원가입에 실패하였습니다. 다시 진행해주세요.');
      }
    };

    return (
      <Dialog
        open={true}
        maxWidth="xs"
        onClose={() => setNickNameModalOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
          회원가입
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            웹사이트에 가입하려면, 닉네임 설정과 이메일 인증을 진행해주세요.
          </DialogContentText>
          <Typography marginTop="1.5rem">NickName</Typography>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBox />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <EmailVerification
            email={email}
            setEmail={setEmail}
            verificationNum={verificationNum}
            setVerificationNum={setVerificationNum}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '1.5rem' }}>
          <Button
            onClick={handleClickCancel}
            variant="contained"
            sx={{
              color: 'white',
              backgroundColor: 'gray',
              ':hover': { backgroundColor: 'darkgray' },
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            가입
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return <>{nickNameModalOpen && <AddMemberInfo />}</>;
};

export default Redirection;
