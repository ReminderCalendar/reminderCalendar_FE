import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledCalendar } from './CalendarStyle';
import WeeklySchedule from './WeeklySchedule';

const Schedule = () => {
  const [today, setToday] = React.useState(new Date());

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <Box marginTop="70px" marginLeft="10px" display="flex">
      <Stack display="flex" flexDirection="column">
        <Button
          variant="outlined"
          size="large"
          sx={{
            boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.25)',
            marginTop: '20px',
          }}
        >
          <AddIcon sx={{ color: '#e5384f', marginRight: '10px' }} />
          <Typography color="black">일정 추가</Typography>
        </Button>
      </Stack>
      <StyledCalendar onChange={onChangeToday} value={today} />
      <WeeklySchedule />
    </Box>
  );
};

export default Schedule;
