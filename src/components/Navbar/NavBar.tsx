import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import ReminderLogo from '../../assets/reminder.png';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../recoil/login/loginModalAtoms';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        flex: 'start-end',
        backgroundColor: '#ffffff',
      }}
    >
      <Toolbar>
        <ButtonGroup
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <IconButton>
            <img src={ReminderLogo} alt="Reminder Logo" width="28px" />
          </IconButton>
          <Typography color="primary.dark" fontWeight="500" fontSize="large">
            ReminderCalendar
          </Typography>
        </ButtonGroup>

        <Box sx={{ marginLeft: 'auto' }}>
          <SearchBar />
          {localStorage.getItem('accessToken') !== null ? (
            <Button
              sx={{ color: 'black', fontWeight: 'bold' }}
              onClick={() => {
                localStorage.clear();
                window.location.replace('/');
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

          <Button
            onClick={() => {
              navigate('/diary');
            }}
            sx={{ color: 'black' }}
          >
            Diary
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
