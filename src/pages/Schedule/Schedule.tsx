import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledCalendar } from './CalendarStyle';
import ScheduleList from './List/ScheduleList';
import WeeklySchedule from './WeeklySchedule';
import { useRecoilValue } from 'recoil';
import { searchTermAtom } from '../../recoil/search/searchTermAtom';

const Schedule = () => {
  const searchTerm = useRecoilValue(searchTermAtom);
  const [today, setToday] = React.useState(new Date());

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <Stack marginTop="75px" display="flex" flexDirection="row">
      <Stack margin="0 20px 0 10px">
        <Button
          size="large"
          sx={{
            width: '180px',
            boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',

            marginY: '10px',
          }}
        >
          <AddIcon sx={{ color: '#e5384f', marginRight: '10px' }} />
          <Typography color="black">일정 추가</Typography>
        </Button>
        <StyledCalendar onChange={onChangeToday} value={today} />
      </Stack>
      {searchTerm === '' ? <WeeklySchedule /> : <ScheduleList />}
    </Stack>
  );
};

export default Schedule;
