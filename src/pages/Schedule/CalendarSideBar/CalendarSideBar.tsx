import React from 'react';
import { Button, Stack, Typography, Box, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledCalendar } from '../../../components/Calendar/CalendarStyle';
import WeeklyMoveButton from './WeeklyMoveButton';
import { useRecoilValue } from 'recoil';
import { isCalendarViewAtom } from '../../../recoil/calendar/calendarViewAtoms';
import { WeeklyMoveButtonProps } from './WeeklyMoveButton';

type DatePiece = Date | null;
type ClickedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarSideBarProps extends WeeklyMoveButtonProps {
  setAddEventDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonBox = styled(Box)({
  display: 'flex',
  margin: '8px 0',
});

const AddScheduleBtn = styled(Button)(({ theme }) => ({
  width: '150px',
  color: theme.palette.primary.dark,
  boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',
}));

const CalendarSideBar = ({
  prevOrNextNum,
  setPrevOrNextNum,
  setAddEventDialogOpen,
}: CalendarSideBarProps) => {
  const isCalendarView = useRecoilValue(isCalendarViewAtom);

  const [clickDay, setClickDay] = React.useState<ClickedDate>(new Date());

  return (
    <Stack margin="0px 20px 0 10px">
      <ButtonBox>
        <AddScheduleBtn
          size="large"
          onClick={() => setAddEventDialogOpen(true)}
        >
          <AddIcon sx={{ marginRight: '10px' }} />
          <Typography color="black">일정 추가</Typography>
        </AddScheduleBtn>
        {isCalendarView && (
          <WeeklyMoveButton
            prevOrNextNum={prevOrNextNum}
            setPrevOrNextNum={setPrevOrNextNum}
          />
        )}
      </ButtonBox>

      <StyledCalendar
        calendarType="gregory"
        onChange={setClickDay}
        value={clickDay}
      />
    </Stack>
  );
};

export default CalendarSideBar;
