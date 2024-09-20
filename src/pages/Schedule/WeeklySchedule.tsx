import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import AddEventDialog from './AddEventDialog';
import moment from 'moment';
import 'moment/locale/ko';
import Reminder from '../../api/api';

export interface Schedule {
  title: string;
  eventDate: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  review: string;
  emotion: string;
  content: string;
}

const week = ['월', '화', '수', '목', '금', '토', '일'];
const time = Array.from({ length: 24 }, (_, i) => i);

const HeaderTableCell = styled(TableCell)({
  textAlign: 'center',
});

const TodayCircle = styled('div')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#e5384f',

  position: 'absolute',
  top: '50%',
  left: '40%',
  zIndex: '-1',
});

const TimeCell = styled(Box)({
  position: 'absolute',
  top: '-8px',
  left: '-18px',
  fontSize: '11px',
  fontWeight: '300',
});

const LastTimeCell = styled(Box)({
  position: 'absolute',
  top: '45px',
  left: '-18px',
  fontSize: '11px',
  fontWeight: '300',
});

const EventCell = styled(TableCell)({
  textAlign: 'center',
  position: 'relative',
  borderRight: '1px solid lightgray',
  height: '20px',
  ':hover': {
    backgroundColor: '#fff5f6',
  },
});

const WeeklySchedule = () => {
  const [addEventDialogOpen, setAddEventDialogOpen] = React.useState(false);

  const [monEvents, setMonEvents] = React.useState<Schedule[]>([]);
  const [tueEvents, setTueEvents] = React.useState<Schedule[]>([]);
  const [wedEvents, setWedEvents] = React.useState<Schedule[]>([]);
  const [thuEvents, setThuEvents] = React.useState<Schedule[]>([]);
  const [friEvents, setFriEvents] = React.useState<Schedule[]>([]);
  const [satEvents, setSatEvents] = React.useState<Schedule[]>([]);
  const [sunEvents, setSunEvents] = React.useState<Schedule[]>([]);

  const handleAddEvent = (newEvent: Schedule) => {
    const eventDate = moment(newEvent.eventDate, 'YYYY-MM-DD').day();

    // 요일별로 이벤트를 추가하는 로직
    if (eventDate === 0) setSunEvents(prev => [...prev, newEvent]);
    if (eventDate === 1) setMonEvents(prev => [...prev, newEvent]);
    if (eventDate === 2) setTueEvents(prev => [...prev, newEvent]);
    if (eventDate === 3) setWedEvents(prev => [...prev, newEvent]);
    if (eventDate === 4) setThuEvents(prev => [...prev, newEvent]);
    if (eventDate === 5) setFriEvents(prev => [...prev, newEvent]);
    if (eventDate === 6) setSatEvents(prev => [...prev, newEvent]);
  };

  React.useEffect(() => {
    const getAllEvents = async () => {
      for (let i = 1; i < 8; i++) {
        try {
          const year = moment().day(i).format('YYYY');
          const month = moment().day(i).format('MM');
          const day = moment().day(i).format('DD');
          const dayoftheweek = moment().day(i).day();
          const { data } = await Reminder.get(
            `/events?yearMonth=${year}-${month}-${day}`,
          );
          if (dayoftheweek === 0) setSunEvents(data);
          if (dayoftheweek === 1) setMonEvents(data);
          if (dayoftheweek === 2) setTueEvents(data);
          if (dayoftheweek === 3) setWedEvents(data);
          if (dayoftheweek === 4) setThuEvents(data);
          if (dayoftheweek === 5) setFriEvents(data);
          if (dayoftheweek === 6) setSatEvents(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getAllEvents();
  }, []);

  const getEventsForStartTime = (
    events: Schedule[] | undefined,
    hour: number,
  ) => {
    return events?.filter(
      event => moment(event.startTime, 'HH:mm').hour() === hour,
    );
  };

  const renderEvents = (events: Schedule[] | undefined, hour: number) => {
    const eventsAtStartTime = getEventsForStartTime(events, hour);
    return eventsAtStartTime?.map((event, index) => {
      const durationTime =
        moment(event.endTime, 'HH:mm').hour() +
        moment(event.endTime, 'HH:mm').minutes() / 60 -
        (moment(event.startTime, 'HH:mm').hour() +
          moment(event.startTime, 'HH:mm').minutes() / 60);

      return (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            fontSize: '12px',
            textOverflow: 'ellipsis',
            color: 'white',
            backgroundColor: theme => theme.palette.primary.main,
            width: '40px',
            height: `${durationTime * 40}px`,
            borderRadius: '4px',
            padding: '2px 5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {event.title}
        </Box>
      );
    });
  };

  return (
    <TableContainer
      sx={{
        paddingLeft: '20px',
        maxHeight: '810px',
        overflowY: 'scroll',
      }}
    >
      {addEventDialogOpen && (
        <AddEventDialog
          addEventDialogOpen={addEventDialogOpen}
          setAddEventDialogOpen={setAddEventDialogOpen}
          onAddEvent={handleAddEvent}
        />
      )}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {week.map((day, idx) => {
              return (
                <HeaderTableCell key={day}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>{day}</Typography>
                    <Typography
                      sx={{
                        marginTop: '10px',
                        fontSize: '20px',
                        color: new Date().getDay() - 1 === idx ? 'white' : '',
                      }}
                    >
                      {moment()
                        .day(idx + 1)
                        .format('DD')}
                    </Typography>
                    {new Date().getDay() - 1 === idx && <TodayCircle />}
                  </Box>
                </HeaderTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {time.map(hour => {
            return (
              <TableRow key={hour}>
                {week.map((day, i) => {
                  const eventsForDay =
                    i === 0
                      ? monEvents
                      : i === 1
                        ? tueEvents
                        : i === 2
                          ? wedEvents
                          : i === 3
                            ? thuEvents
                            : i === 4
                              ? friEvents
                              : i === 5
                                ? satEvents
                                : sunEvents;

                  return (
                    <EventCell
                      key={day}
                      onClick={() => setAddEventDialogOpen(true)}
                    >
                      {i === 0 && <TimeCell>{hour}</TimeCell>}
                      {hour === 23 && i === 0 && (
                        <LastTimeCell>24</LastTimeCell>
                      )}
                      {renderEvents(eventsForDay, hour)}
                    </EventCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeeklySchedule;
