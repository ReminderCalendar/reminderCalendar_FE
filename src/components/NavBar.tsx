import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { ReminderLogo } from '../assets/reminder.png';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../recoil/login/loginModalAtoms';

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <AppBar
      sx={{
        position: 'fixed',
        flex: 'start-end',
      }}
    >
      <Toolbar>
        <Typography>ReminderCalendar</Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            sx={{ color: 'text.primary' }}
            onClick={() => setModalOpen(!isModalOpen)}
          >
            회원가입/로그인
          </Button>
          <Button sx={{ color: 'text.primary' }}>My</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
