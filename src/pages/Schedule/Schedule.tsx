import React from 'react';
import {
  Button,
  IconButton,
  Stack,
  Typography,
  Box,
  ButtonGroup,
  styled,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import { StyledCalendar } from './CalendarStyle';
import ScheduleList from './List/ScheduleList';
import WeeklySchedule from './WeeklySchedule';
import { useRecoilValue } from 'recoil';
import { searchTermAtom } from '../../recoil/search/searchTermAtom';

const ButtonBox = styled(Box)({
  display: 'flex',
  margin: '15px 0 25px 0',
});

const AddScheduleBtn = styled(Button)({
  width: '150px',
  boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',
});

const Schedule = () => {
  const searchTerm = useRecoilValue(searchTermAtom);
  const [today, setToday] = React.useState(new Date());
  const [prevOrNextNum, setPrevOrNextNum] = React.useState<number>(0);

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <Stack marginTop="75px" display="flex" flexDirection="row">
      <Stack margin="0 20px 0 10px">
        <ButtonBox>
          <AddScheduleBtn size="large">
            <AddIcon sx={{ color: '#e5384f', marginRight: '10px' }} />
            <Typography color="black">일정 추가</Typography>
          </AddScheduleBtn>
          <ButtonGroup sx={{ marginLeft: 'auto' }}>
            <IconButton
              size="large"
              onClick={() => setPrevOrNextNum(prevOrNextNum - 7)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => setPrevOrNextNum(prevOrNextNum + 7)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </ButtonGroup>
        </ButtonBox>

        <StyledCalendar onChange={onChangeToday} value={today} />
      </Stack>
      {searchTerm === '' ? (
        <WeeklySchedule curWeeklyNum={prevOrNextNum} />
      ) : (
        <ScheduleList />
      )}
    </Stack>
  );
};

export default Schedule;
