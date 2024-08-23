import { Box } from '@mui/material';
import React from 'react';
import { StyledCalendar } from './CalendarStyle';

const Schedule = () => {
  const [today, setToday] = React.useState(new Date());

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <Box marginTop="150px">
      <StyledCalendar onChange={onChangeToday} value={today} />
    </Box>
  );
};

export default Schedule;
