import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useRecoilState } from 'recoil';
import { isCalendarViewAtom } from '../../../recoil/calendar/calendarViewAtoms';

const ViewButton = () => {
  const [isCalendarView, setCalendarView] =
    useRecoilState<boolean>(isCalendarViewAtom);

  return (
    <ButtonGroup
      variant="outlined"
      sx={{
        marginLeft: '20px',
        marginRight: '10px',
      }}
    >
      <Button
        onClick={() => setCalendarView(true)}
        sx={{
          color: theme => theme.palette.primary.dark,
          backgroundColor: isCalendarView ? '#ffe8eb' : 'none',
        }}
      >
        <DateRangeIcon />
      </Button>
      <Button
        onClick={() => setCalendarView(false)}
        sx={{
          color: theme => theme.palette.primary.dark,
          backgroundColor: !isCalendarView ? '#ffe8eb' : 'none',
        }}
      >
        <FormatListBulletedIcon />
      </Button>
    </ButtonGroup>
  );
};

export default ViewButton;
