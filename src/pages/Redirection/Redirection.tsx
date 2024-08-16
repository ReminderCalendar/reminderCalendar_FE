import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const Redirection = () => {
  const [nickNmaeModalOpen, setNickNmaeModalOpen] = useState(false);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const kakaoLogin = async () => {
    await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_REACT_APP_REDIRECT_URL}/?code=${code}}`, //백으로 인가코드 보내는 주소
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then(res => {
      console.log(res);

      localStorage.setItem('name', res.data.account.kakaoName);

      //navigate("/");
    });
  };

  useEffect(() => {
    kakaoLogin();
  });

  const handleClose = () => {
    setNickNmaeModalOpen(false);
  };

  const SetNickName = () => {
    return (
      <Dialog
        open={true}
        sx={{ margin: '10rem' }}
        onClose={() => setNickNmaeModalOpen(false)}
      >
        <DialogTitle>회원가입</DialogTitle>
        <DialogContent>
          <DialogContentText>
            웹사이트에 가입하려면, 이메일 인증을 진행해주세요.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            sx={{ color: 'primary.dark' }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
            sx={{
              color: 'white',
              backgroundColor: 'primary.dark',
              ':hover': { backgroundColor: 'primary.light' },
            }}
          >
            이메일 인증
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <p>로그인 중입니다.</p>
      {nickNmaeModalOpen && <SetNickName />}
    </div>
  );
};

export default Redirection;
