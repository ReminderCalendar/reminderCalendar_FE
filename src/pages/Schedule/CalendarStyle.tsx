import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)({
  position: 'fixed',
  width: '330px',
  fontWeight: 'bold',
  backgroundColor: '#fff5f6',
  border: 'none',
  marginTop: '85px',
  zIndex: -1,

  '& .react-calendar__navigation': {
    height: '40px',
  },

  '& .react-calendar__navigation button': {
    fontSize: '14px',
    fontWeight: '400',

    color: 'white',
    backgroundColor: '#eb6577',
    ':hover': {
      backgroundColor: '#eb596d',
    },
  },

  '& .react-calendar__month-view__weekdays': {
    fontSize: '11px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    height: '20px',
  },

  '& .react-calendar__year-view .react-calendar__tile, .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile':
    {
      height: '40px',
      color: 'orange',
      textAlign: 'center',
    },

  '& .react-calendar__tile': {
    fontSize: '12px',
    fontWeight: '600',
    height: '40px',
    borderRadius: '10px',
  },
  '& .react-calendar__tile--active': {
    backgroundColor: '#eb6577',
    borderRadius: '10px',

    ':hover': {
      backgroundColor: '#e5384f',
    },
  },
});
