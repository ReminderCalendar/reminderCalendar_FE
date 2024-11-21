import React from 'react';
import DiaryIcon from '../../assets/diaryIcon.png';
import { Box, List, ListItem, Typography, styled } from '@mui/material';
import ReminderAPI from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Diary } from '../../types/diary';

const StyledList = styled(List)({
  height: '700px',
  overflowY: 'scroll',
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  diplay: 'flex',
  alignItems: 'center',
  height: '55px',
  paddingY: '12px',
  borderBottom: '1px solid lightgray',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const DiaryListPage = () => {
  const [diaryList, setDiaryList] = React.useState<Diary[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getDiary = async () => {
      try {
        const { data } = await ReminderAPI.get('/diaries');
        setDiaryList(data);
      } catch (err) {
        console.error(err);
      }
    };
    getDiary();
  }, []);

  return (
    <Box sx={{ height: '814px', borderLeft: '1px solid lightgray' }}>
      <StyledList>
        {diaryList.map(diary => {
          return (
            <StyledListItem
              key={diary.id}
              onClick={() => {
                navigate(`/diary/detail/${diary.id}`);
              }}
            >
              <img src={DiaryIcon} alt="diary" width="32px" />
              <Typography sx={{ fontSize: '14px', marginLeft: '20px' }}>
                {diary.date}
              </Typography>
              <Typography sx={{ fontSize: '17px', marginLeft: '80px' }}>
                {diary.title}
              </Typography>
            </StyledListItem>
          );
        })}
      </StyledList>
    </Box>
  );
};

export default DiaryListPage;
