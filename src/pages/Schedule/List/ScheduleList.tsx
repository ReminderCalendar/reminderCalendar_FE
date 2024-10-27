import React from 'react';
import { useRecoilState } from 'recoil';
import { searchTermAtom } from '../../../recoil/search/searchTermAtom';
import Reminder from '../../../api/api';
import { List, ListItem, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment';
import 'moment/locale/ko';
import EventIcon from '@mui/icons-material/Event';
import { Schedule } from '../WeeklySchedule';
import EventDetailModal from '../EventDetailModal';
import AddEventDialog from '../AddEventDialog';
import useDebounce from '../../../hooks/useDebounce';

const ScheduleList = () => {
  const [addEventDialogOpen, setAddEventDialogOpen] = React.useState(false);
  const [eventDetailModalOpen, setEventDetailModalOpen] =
    React.useState<boolean>(false);
  const [searchTerm] = useRecoilState(searchTermAtom);
  const [searchtermEventList, setSearchtermEventList] = React.useState<
    Schedule[]
  >([]);
  const isEditMode = true;
  const [editToEvent, setEditToEvent] = React.useState<Schedule | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<Schedule | null>(
    null,
  );
  const [modalPosition, setModalPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    const getEventList = async () => {
      const { data } = await Reminder.get(
        `/events?query=${debouncedSearchTerm}`,
      );
      setSearchtermEventList(data);
    };
    getEventList();
  }, [debouncedSearchTerm]);

  const handleListItemClick = async (
    event: Schedule,
    eventElement: HTMLElement,
  ) => {
    const rect = eventElement.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY - 70,
      left: rect.left + 180,
    });

    try {
      const { data } = await Reminder.get(`/events/${event.id}`);
      setSelectedEvent(data);
    } catch (err) {
      console.error(err);
    }

    setEventDetailModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    try {
      await Reminder.delete(`/events/${selectedEvent?.id}`);
    } catch (err) {
      console.error(err);
    }

    setSearchtermEventList(prev =>
      prev.filter(event => event.id !== selectedEvent?.id),
    );
    setSelectedEvent(null);
    setModalPosition(null);
    setEventDetailModalOpen(false);
  };

  const handleEditEvent = async () => {
    setAddEventDialogOpen(true);

    const updateEventInDay = (events: Schedule[]) =>
      events.map(event => (event === editToEvent ? editToEvent : event));

    setSearchtermEventList(prev => updateEventInDay(prev));
    setSelectedEvent(null);
    setModalPosition(null);
  };

  const handleEditModeOn = () => {
    setAddEventDialogOpen(true);
  };

  return (
    <List
      sx={{
        width: '100%',
        height: '810px',
        overflowY: 'scroll',

        borderLeft: '1px solid lightgray',
      }}
    >
      {searchtermEventList?.map(event => {
        const dayoftheweekNum = moment(event.eventDate, 'YYYY-MM-DD').day();
        const dayoftheweek =
          dayoftheweekNum === 0
            ? '일'
            : dayoftheweekNum === 1
              ? '월'
              : dayoftheweekNum === 2
                ? '화'
                : dayoftheweekNum === 3
                  ? '수'
                  : dayoftheweekNum === 4
                    ? '목'
                    : dayoftheweekNum === 5
                      ? '금'
                      : '토';

        return (
          <React.Fragment key={event.id}>
            <ListItem
              onClick={e => handleListItemClick(event, e.currentTarget)}
              sx={{
                diplay: 'flex',
                alignItems: 'center',
                paddingY: '12px',
                borderBottom: '1px solid lightgray',
                ':hover': {
                  backgroundColor: theme => theme.palette.primary.light,
                },
                cursor: 'pointer',
              }}
            >
              <EventIcon />
              <Typography variant="body2" marginX="10px">
                {event.eventDate}, {dayoftheweek}
              </Typography>
              <CircleIcon
                sx={{
                  width: '10px',
                  marginLeft: '30px',
                  marginRight: '10px',
                  color: theme => theme.palette.primary.dark,
                }}
              />
              <Typography>
                {event.startTime} - {event.endTime}
              </Typography>
              <Typography sx={{ marginLeft: '60px' }}>{event.title}</Typography>
            </ListItem>
            {eventDetailModalOpen &&
              selectedEvent?.id === event.id &&
              modalPosition && (
                <EventDetailModal
                  setEventDetailModalOpen={setEventDetailModalOpen}
                  event={selectedEvent}
                  position={modalPosition}
                  onDeleteEvent={handleDeleteEvent}
                  onEditMode={handleEditModeOn}
                />
              )}
            {addEventDialogOpen && (
              <AddEventDialog
                addEventDialogOpen={addEventDialogOpen}
                setAddEventDialogOpen={setAddEventDialogOpen}
                onAddOrEditEvent={handleEditEvent}
                isEditMode={isEditMode}
                eventToEdit={selectedEvent}
                setEventToEdit={setEditToEvent}
              />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ScheduleList;
