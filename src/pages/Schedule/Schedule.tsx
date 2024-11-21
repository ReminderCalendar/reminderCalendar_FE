import React from 'react';
import { Stack, styled } from '@mui/material';
import ScheduleList from './List/ScheduleList';
import CalendarSideBar from './CalendarSideBar/CalendarSideBar';
import WeeklySchedule from './WeeklySchedule';
import { useRecoilValue } from 'recoil';
import { searchTermAtom } from '../../recoil/search/searchTermAtom';
import { isCalendarViewAtom } from '../../recoil/calendar/calendarViewAtoms';

const ScheduleContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '75px',
});

const Schedule = () => {
  const searchTerm = useRecoilValue(searchTermAtom);
  const isCalendarView = useRecoilValue(isCalendarViewAtom);

  const [prevOrNextNum, setPrevOrNextNum] = React.useState<number>(0);
  const [addEventDialogOpen, setAddEventDialogOpen] = React.useState(false);

  return (
    <ScheduleContainer>
      <CalendarSideBar
        prevOrNextNum={prevOrNextNum}
        setPrevOrNextNum={setPrevOrNextNum}
        setAddEventDialogOpen={setAddEventDialogOpen}
      />

      {!isCalendarView || searchTerm ? (
        <ScheduleList />
      ) : (
        <WeeklySchedule
          curWeeklyNum={prevOrNextNum}
          addEventDialogOpen={addEventDialogOpen}
          setAddEventDialogOpen={setAddEventDialogOpen}
        />
      )}
    </ScheduleContainer>
  );
};

export default Schedule;
