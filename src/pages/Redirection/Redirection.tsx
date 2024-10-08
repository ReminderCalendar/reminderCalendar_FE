import React from 'react';
import Reminder from '../../api/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
  CircularProgress,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBox, Email } from '@mui/icons-material';
import { isEmailValid } from '../../util/validation';

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const [nickNmaeModalOpen, setNickNmaeModalOpen] = React.useState(false);

  const isMember = async () => {
    try {
      const { data } = await Reminder.get('/member');
      localStorage.setItem('active', 'true');
      console.log(data);
    } catch (err) {
      localStorage.setItem('active', 'false');
      setNickNmaeModalOpen(true);
    }
  };

  React.useEffect(() => {
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
  }, [code]);

  const LoginProgress = () => {
    return (
      <Dialog open={true} maxWidth="xs" fullWidth>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3rem 0',
          }}
        >
          <CircularProgress
            sx={{ color: theme => theme.palette.primary.dark }}
          />
          <Typography marginTop="1.5rem">로그인 중입니다.</Typography>
        </DialogContent>
      </Dialog>
    );
  };

  const AddMemberInfo = () => {
    const [email, setEmail] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [verificationNum, setVerificationNum] = React.useState('');
    const [isEmailsend, setEmailsend] = React.useState(false);
    //const [isVerificationCodeCorrect, setVerificationCodeCorrect] =
    React.useState(false);

    const handleSendEmail = async () => {
      if (isEmailValid(email)) {
        try {
          await Reminder.post('/email/code', { email });
          setEmailsend(true);
        } catch (err) {
          window.alert('이메일 발송에 실패했습니다.');
        }
      }
    };

    const handleClickCancel = () => {
      setNickNmaeModalOpen(false);
      navigate('/');
    };

    const handleCheckCorrect = async () => {
      if (verificationNum === '') {
        return;
      }
      try {
        await Reminder.post('/email/verify', {
          verificationCode: verificationNum,
        });
        window.alert('인증에 성공하셨습니다!');
        //setVerificationCodeCorrect(true);
        //가입 버튼 활성화/비활성화 설정
      } catch (err) {
        window.alert('인증번호가 일치하지 않습니다.');
      }
    };

    const handleSubmit = async () => {
      await Reminder.post('/email/activate', {
        email,
        username: nickname,
        verificationCode: verificationNum,
      });
      window.alert('Reminder Calendar에 오신 것을 환영합니다 :)');
      navigate('/');
    };

    return (
      <Dialog
        open={true}
        maxWidth="xs"
        onClose={() => setNickNmaeModalOpen(false)}
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
          <Typography marginTop="2rem">Email</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              sx={{ width: '290px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              placeholder="hgd@reminder.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              sx={{
                color: 'white',
                backgroundColor: theme => theme.palette.primary.dark,
                ':hover': { backgroundColor: 'primary.light' },
              }}
              onClick={handleSendEmail}
            >
              {isEmailsend ? '재전송' : '이메일 인증'}
            </Button>
          </Box>
          {!isEmailValid(email) && email !== '' && (
            <Typography variant="caption" color="error">
              영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
            </Typography>
          )}
          {isEmailsend && (
            <>
              <Typography className="authentication-code" marginTop="1rem">
                인증코드
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextField
                  sx={{ width: '290px' }}
                  variant="standard"
                  value={verificationNum}
                  onChange={e => setVerificationNum(e.target.value)}
                />
                <Typography mx="0.7rem">2:50</Typography>
                <Button
                  type="submit"
                  sx={{
                    color: 'white',
                    backgroundColor: theme => theme.palette.primary.dark,
                    ':hover': { backgroundColor: 'primary.light' },
                  }}
                  onClick={handleCheckCorrect}
                >
                  확인
                </Button>
              </Box>
            </>
          )}
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

  return (
    <>
      {localStorage.getItem('active') === null && <LoginProgress />}
      {nickNmaeModalOpen && <AddMemberInfo />}
    </>
  );
};

export default Redirection;
