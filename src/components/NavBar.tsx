import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../recoil/login/loginModalAtoms';

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <AppBar sx={{ position: 'fixed', flex: 'start-end' }}>
      <Toolbar>
        <Typography>ReminderCalendar</Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            sx={{ color: 'white' }}
            onClick={() => setModalOpen(!isModalOpen)}
          >
            회원가입
          </Button>
          <Button
            sx={{ color: 'white' }}
            onClick={() => setModalOpen(!isModalOpen)}
          >
            로그인
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
