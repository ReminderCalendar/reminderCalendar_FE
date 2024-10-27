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
import EventDetailModal from './EventDetailModal';
import moment from 'moment';
import 'moment/locale/ko';
import Reminder from '../../api/api';

export interface Schedule {
  id: number;
  title: string;
  eventDate: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  review: string;
  emotion: string;
  content: string;
  notificationType: string;
  notificationTime: string;
}

const week = ['일', '월', '화', '수', '목', '금', '토'];
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
  top: '48%',
  left: '41%',
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

interface WeeklyScheduleProps {
  curWeeklyNum: number;
  addEventDialogOpen: boolean;
  setAddEventDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeeklySchedule = ({
  curWeeklyNum,
  addEventDialogOpen,
  setAddEventDialogOpen,
}: WeeklyScheduleProps) => {
  const [eventDetailModalOpen, setEventDetailModalOpen] =
    React.useState<boolean>(false);

  //일정수정모드
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [eventToEdit, setEventToEdit] = React.useState<Schedule | null>(null);

  //선택된 일정과 위치
  const [selectedEvent, setSelectedEvent] = React.useState<Schedule | null>(
    null,
  );
  const [modalPosition, setModalPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  const [monEvents, setMonEvents] = React.useState<Schedule[]>([]);
  const [tueEvents, setTueEvents] = React.useState<Schedule[]>([]);
  const [wedEvents, setWedEvents] = React.useState<Schedule[]>([]);
  const [thuEvents, setThuEvents] = React.useState<Schedule[]>([]);
  const [friEvents, setFriEvents] = React.useState<Schedule[]>([]);
  const [satEvents, setSatEvents] = React.useState<Schedule[]>([]);
  const [sunEvents, setSunEvents] = React.useState<Schedule[]>([]);

  React.useEffect(() => {
    const getAllEvents = async () => {
      for (let i = 0 + curWeeklyNum; i < 7 + curWeeklyNum; i++) {
        try {
          const year = moment().day(i).format('YYYY');
          const month = moment().day(i).format('MM');
          const day = Number(moment().day(i).format('DD'));
          const dayoftheweek = moment().day(i).day();
          console.log(moment().day(i).day());
          const { data } = await Reminder.get(
            `/events?datePrefix=${year}-${month}-${day}`,
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
  }, [curWeeklyNum]);

  const handleAddOrEditEvent = (event: Schedule) => {
    if (isEditMode) {
      handleUpdateEvent();

      setIsEditMode(false);
      setEventToEdit(null);
    } else {
      handleAddEvent(event);
    }

    setAddEventDialogOpen(false);
  };

  const handleAddEvent = (addEvent: Schedule) => {
    const eventDate = moment(addEvent.eventDate, 'YYYY-MM-DD').day();

    // 요일별로 해당 이벤트추가
    if (eventDate === 0) setSunEvents(prev => [...prev, addEvent]);
    if (eventDate === 1) setMonEvents(prev => [...prev, addEvent]);
    if (eventDate === 2) setTueEvents(prev => [...prev, addEvent]);
    if (eventDate === 3) setWedEvents(prev => [...prev, addEvent]);
    if (eventDate === 4) setThuEvents(prev => [...prev, addEvent]);
    if (eventDate === 5) setFriEvents(prev => [...prev, addEvent]);
    if (eventDate === 6) setSatEvents(prev => [...prev, addEvent]);
  };

  const handleDeleteEvent = async () => {
    const eventDate = moment(selectedEvent?.eventDate, 'YYYY-MM-DD').day();

    try {
      await Reminder.delete(`/events/${selectedEvent?.id}`);
    } catch (err) {
      console.error(err);
    }

    // 요일별로 해당 이벤트삭제
    if (eventDate === 0)
      setSunEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 1)
      setMonEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 2)
      setTueEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 3)
      setWedEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 4)
      setThuEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 5)
      setFriEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
    if (eventDate === 6)
      setSatEvents(prev =>
        prev.filter(event => event.id !== selectedEvent?.id),
      );
  };

  const handleUpdateEvent = () => {
    const eventDate = moment(selectedEvent?.eventDate, 'YYYY-MM-DD').day();

    if (eventToEdit && selectedEvent) {
      if (eventDate === 0)
        setSunEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 1)
        setMonEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 2)
        setTueEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 3)
        setWedEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 4)
        setThuEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 5)
        setFriEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
      if (eventDate === 6)
        setSatEvents(prev =>
          prev.map(event => (event === selectedEvent ? eventToEdit : event)),
        );
    }
  };

  const handleEditModeOn = () => {
    setIsEditMode(true);
    setEventToEdit(selectedEvent);
    setAddEventDialogOpen(true);
  };

  const handleEventClick = async (e: React.MouseEvent, event: Schedule) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - rect.width - 285,
    });

    try {
      const { data } = await Reminder.get(`/events/${event.id}`);
      setSelectedEvent(data);
    } catch (err) {
      console.error(err);
    }

    setEventDetailModalOpen(true);
  };

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
      const startHeight =
        (moment(event.startTime, 'HH:mm').minutes() / 60) * 40;

      return (
        <Box
          key={index}
          onClick={e => {
            e.stopPropagation();
            handleEventClick(e, event);
          }}
          sx={{
            position: 'absolute',
            top: `${startHeight}px`,

            fontSize: '12px',
            textOverflow: 'ellipsis',
            color: 'white',
            backgroundColor: theme => theme.palette.primary.main,
            width: '80px',
            height: `${durationTime * 50}px`,
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
        maxHeight: '850px',
        overflowY: eventDetailModalOpen ? 'hidden' : 'scroll',
      }}
    >
      {addEventDialogOpen && (
        <AddEventDialog
          addEventDialogOpen={addEventDialogOpen}
          setAddEventDialogOpen={setAddEventDialogOpen}
          onAddOrEditEvent={handleAddOrEditEvent}
          isEditMode={isEditMode}
          eventToEdit={eventToEdit}
          setEventToEdit={setEventToEdit}
        />
      )}
      {eventDetailModalOpen && selectedEvent && modalPosition && (
        <EventDetailModal
          setEventDetailModalOpen={setEventDetailModalOpen}
          event={selectedEvent}
          position={modalPosition}
          onDeleteEvent={handleDeleteEvent}
          onEditMode={handleEditModeOn}
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
                        color:
                          moment().format('YYYY-MM-DD') ===
                          moment()
                            .day(idx + curWeeklyNum)
                            .format('YYYY-MM-DD')
                            ? 'white'
                            : '',
                      }}
                    >
                      {moment()
                        .day(idx + curWeeklyNum)
                        .format('DD')}
                    </Typography>
                    {moment().format('YYYY-MM-DD') ===
                      moment()
                        .day(idx + curWeeklyNum)
                        .format('YYYY-MM-DD') && <TodayCircle />}
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
                      ? sunEvents
                      : i === 1
                        ? monEvents
                        : i === 2
                          ? tueEvents
                          : i === 3
                            ? wedEvents
                            : i === 4
                              ? thuEvents
                              : i === 5
                                ? friEvents
                                : satEvents;

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
