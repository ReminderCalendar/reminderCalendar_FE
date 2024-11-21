import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, styled } from '@mui/material';
import { Diary } from '../../types/diary';
import ReminderAPI from '../../api/api';

const Container = styled(Stack)(({ theme }) => ({
  minHeight: '450px',
  diplay: 'flex',
  alignItems: 'center',
  borderRadius: '25px',
  backgroundColor: theme.palette.primary.light,
  padding: '30px 40px',
  marginTop: '14px',
}));

const DiaryDetailPage = () => {
  const { id } = useParams();

  const [diaryDetail, setDiaryDetail] = React.useState<Diary>();

  React.useEffect(() => {
    const getDiary = async () => {
      try {
        const { data } = await ReminderAPI.get(`/diaries/${id}`);
        setDiaryDetail(data);
      } catch (err) {
        window.alert(
          '일기를 불러오는 데 오류가 발생했습니다. 다시 시도해 주세요.',
        );
        window.location.replace('/diary');
        console.error(err);
      }
    };

    getDiary();
  }, [id]);

  return (
    <Container>
      <Typography sx={{ fontSize: '18px', marginTop: '10px' }}>
        {diaryDetail?.title}
      </Typography>

      <Typography
        display="block"
        sx={{
          width: '85%',
          padding: '30px 50px',
          marginTop: '20px',
          borderColor: theme => theme.palette.primary.main,
        }}
      >
        {diaryDetail?.content}
      </Typography>
    </Container>
  );
};

export default DiaryDetailPage;
