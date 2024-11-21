import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { StyledCalendar } from '../../components/Calendar/CalendarStyle';
import { Button, Stack, styled, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

type DatePiece = Date | null;
type ClickedDate = DatePiece | [DatePiece, DatePiece];

const DiaryContainer = styled(Stack)({
  margin: '75px 10px 0 10px',
  display: 'flex',
  flexDirection: 'row',
});

const WriteDiaryButton = styled(Button)({
  width: '200px',
  height: '45px',

  margin: '10px 0',

  fontWeight: 'bold',
  color: 'black',
  boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',
});

const Diary = () => {
  const [clickDay, setClickDay] = React.useState<ClickedDate>(new Date());

  const navigate = useNavigate();

  return (
    <DiaryContainer>
      <Stack>
        <WriteDiaryButton onClick={() => navigate('/diary/write')}>
          <CreateIcon sx={{ color: '#e5384f', marginRight: '10px' }} />
          <Typography>일기 작성</Typography>
        </WriteDiaryButton>
        <StyledCalendar
          calendarType="gregory"
          onChange={setClickDay}
          value={clickDay}
        />
      </Stack>

      <Stack sx={{ width: '100%', height: '100%', marginLeft: '22px' }}>
        <Outlet />
      </Stack>
    </DiaryContainer>
  );
};

export default Diary;
