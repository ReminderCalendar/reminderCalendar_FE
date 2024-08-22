import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import ReminderLogo from '../assets/reminder.png';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../recoil/login/loginModalAtoms';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        position: 'fixed',
        flex: 'start-end',
        backgroundColor: '#ffffff',
      }}
    >
      <Toolbar>
        <IconButton>
          <img src={ReminderLogo} alt="Reminder Logo" width="28px" />
        </IconButton>
        <Typography color="primary.dark" fontWeight="500" fontSize="large">
          ReminderCalendar
        </Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          {localStorage.getItem('accessToken') !== null ? (
            <Button
              sx={{ color: 'black', fontWeight: 'bold' }}
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button
              sx={{ color: 'black' }}
              onClick={() => setModalOpen(!isModalOpen)}
            >
              회원가입/로그인
            </Button>
          )}

          <Button sx={{ color: 'black' }}>My</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
