import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReminderLogo from '../../assets/reminder.png';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../recoil/login/loginModalAtoms';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ViewButton from './components/ViewButton';

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);
  const navigate = useNavigate();
  const location = useLocation();

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

        {location.pathname.includes('calendar') && (
          <>
            <SearchBar />
            <ViewButton />
            <Button
              onClick={() => {
                navigate('/diary');
              }}
              sx={{ fontSize: '15px' }}
            >
              Diary
            </Button>
          </>
        )}

        {location.pathname.includes('diary') && (
          <Button
            startIcon={<DateRangeIcon />}
            onClick={() => navigate('/calendar')}
            variant="outlined"
            sx={{ margin: '0 15px 0 auto' }}
          >
            Calendar
          </Button>
        )}

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
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
