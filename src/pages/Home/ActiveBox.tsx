import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../recoil/login/loginModalAtoms';

const ActiveBox = () => {
  const [isModalOpen, setModalOpen] = useRecoilState<boolean>(isModalOpenAtom);

  return (
    <Box>
      <Box
        display="flex"
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '780px',
            height: '150px',
            padding: '20px',
            backgroundColor: theme => theme.palette.primary.light,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WarningAmberIcon
              sx={{
                fontSize: '100px',
                color: theme => theme.palette.primary.dark,
                marginRight: '14px',
              }}
            />
            <Typography fontSize="17px" fontWeight="bold">
              Reminder Calendar 서비스는 회원가입 후 계정 활성화를 하신 후
              사용하실 수 있습니다.
            </Typography>
          </Box>

          <Button
            onClick={() => setModalOpen(!isModalOpen)}
            sx={{ margin: '10px 20px 0 auto' }}
          >
            {localStorage.getItem('active') === null
              ? '회원 가입하기'
              : localStorage.getItem('active') === 'false'
                ? '계정 활성화하기'
                : null}
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default ActiveBox;
