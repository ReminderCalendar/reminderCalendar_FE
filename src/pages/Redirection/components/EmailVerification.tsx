import React from 'react';
import {
  Button,
  Box,
  TextField,
  Typography,
  InputAdornment,
  styled,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import Reminder from '../../../api/api';
import { isEmailValid } from '../../../util/validation';

interface EmailVerificationProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  verificationNum: string;
  setVerificationNum: React.Dispatch<React.SetStateAction<string>>;
}

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: theme.palette.primary.dark,
  ':hover': { backgroundColor: theme.palette.primary.light },
}));

const EmailVerification = ({
  email,
  setEmail,
  verificationNum,
  setVerificationNum,
}: EmailVerificationProps) => {
  const [isEmailsend, setEmailsend] = React.useState(false);

  const handleSendEmail = async () => {
    if (isEmailValid(email)) {
      setEmailsend(true);
      try {
        await Reminder.post('/email/code', { email });
      } catch (err) {
        window.alert(err.response.data.message);
      }
    }
  };

  const handleCheckCorrect = async () => {
    if (verificationNum === '') {
      window.alert('인증번호를 입력해주세요.');
      return;
    }
    try {
      await Reminder.get(`/email/verify?verificationCode=${verificationNum}`);
      window.alert('인증번호가 일치합니다! 회원가입을 진행해주세요:)');
      setEmailsend(false);
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <>
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
        <StyledButton type="submit" onClick={handleSendEmail}>
          {isEmailsend ? '재전송' : '이메일 인증'}
        </StyledButton>
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
            <StyledButton type="submit" onClick={handleCheckCorrect}>
              확인
            </StyledButton>
          </Box>
        </>
      )}
    </>
  );
};

export default EmailVerification;
