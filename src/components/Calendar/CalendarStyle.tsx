import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)({
  width: '300px',
  fontWeight: 'bold',
  backgroundColor: '#fff5f6',
  border: 'none',
  marginTop: '12px',

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

  '& .react-calendar__tile--now': {
    color: 'white',
    backgroundColor: '#eb6577',
    borderRadius: '10px',

    ':hover': {
      backgroundColor: 'gray',
    },
  },

  '& .react-calendar__tile--active': {
    color: '#e5384f',
    backgroundColor: '#f7d5d9',

    ':focus': {
      backgroundColor: '#f7d5e5',
    },

    ':hover': {
      backgroundColor: 'gray',
    },
  },
});
