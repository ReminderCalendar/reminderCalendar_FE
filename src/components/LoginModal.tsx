import GoogleLogo from '../assets/googlelogo.png';
import {
  Box,
  Avatar,
  Dialog,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import ReminderCalendarLogo from '../assets/reminder.png';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../recoil/login/loginModalAtoms';

const BtnBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid grey',
  width: '15rem',
  height: '2rem',
  borderRadius: '5rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  ':hover': {
    backgroundColor: 'lightgrey',
  },
});

const SignText = styled(Typography)({
  marginLeft: '1.5rem',
  fontSize: '1rem',
});

const LoginModal = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      sx={{ '& .MuiDialog-paper': { borderRadius: '1rem' } }}
    >
      <div
        style={{
          display: 'flex',
          backgroundColor: '#e5384f',
          height: '3rem',
          width: '100%',
        }}
      >
        <IconButton
          onClick={() => setModalOpen(!isModalOpen)}
          sx={{ margin: '0 0.4rem 0 auto' }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1.7rem',
          backgroundColor: '#fffdfc',
        }}
      >
        <IconButton
          sx={{
            display: 'flex',
            margin: 'auto',
            color: 'black',
          }}
        >
          <img src={ReminderCalendarLogo} width="45rem" height="45rem" />
        </IconButton>
        <DialogTitle
          variant="h5"
          sx={{
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          Reminder Calendar에 오신 것을 환영합니다.
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5rem',
          }}
        >
          <BtnBox>
            <Avatar
              src={GoogleLogo}
              sx={{ width: '1.5rem', height: '1.5rem' }}
            />
            <SignText>Google 계정으로 계속하기</SignText>
          </BtnBox>
        </DialogContent>
      </Box>
      <div
        style={{
          backgroundColor: '#e5384f',
          height: '1.5rem',
          width: '100%',
        }}
      ></div>
    </Dialog>
  );
};

export default LoginModal;
