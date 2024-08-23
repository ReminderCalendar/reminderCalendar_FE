import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)({
  width: '100%',
  fontWeight: 'bold',
  backgroundColor: '#fff5f6',
  border: 'none',

  '& .react-calendar__navigation': {
    height: '60px',

    ':hover': {},
  },
});
