import React from 'react';
import { StyledCalendar } from '../Schedule/CalendarStyle';
import {
  Button,
  IconButton,
  Box,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DiaryList from './DiaryList';
import EditDiary from './EditDiary';
import Reminder from '../../api/api';

export interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}

const CustomStyledCalendar = styled(StyledCalendar)({
  marginTop: '70px',
  marginLeft: '10px',
});

const Diary = () => {
  const [isWrite, setIsWrite] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isWatch, setIsWatch] = React.useState<boolean>(false);
  const [selectedDiary, setSelectedDiary] = React.useState<Diary | null>(null);
  const [allDiary, setAllDiary] = React.useState<Diary[]>([]);

  React.useEffect(() => {
    const getAllDiary = async () => {
      const { data } = await Reminder.get('/diaries');
      setAllDiary(data);
    };
    getAllDiary();
  }, []);

  const handleEditDiary = (editDiary: Diary) => {
    setAllDiary(prev =>
      prev.map(diary => (diary === selectedDiary ? editDiary : diary)),
    );
  };

  const handleAddDiary = (diary: Diary) => {
    setAllDiary(prev => [...prev, diary]);
  };
  console.log(isWrite);
  return (
    <Stack marginTop="95px" display="flex" flexDirection="row">
      <Stack>
        <CustomStyledCalendar calendarType="gregory" />
      </Stack>

      <Stack>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: '100%',
            marginBottom: '15px',
          }}
        >
          {isWatch && (
            <IconButton
              onClick={() => {
                setIsEdit(true);
                setIsWatch(false);
              }}
              sx={{
                left: '1210px',
                color: theme => theme.palette.primary.dark,
                boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',
              }}
            >
              <CreateIcon />
            </IconButton>
          )}
          <Button
            onClick={() => {
              if (isWrite) {
                setIsWrite(false);
              } else if (isWatch) {
                setIsWatch(false);
              } else if (isEdit) {
                setIsEdit(false);
              } else {
                setIsWrite(true);
              }
            }}
            sx={{
              marginLeft: 'auto',
              marginRight: '15px',
              width: '240px',
              height: '40px',
              boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.2)',
            }}
            size="large"
          >
            {isWrite || isEdit || isWatch ? (
              <FormatListBulletedIcon
                sx={{ color: '#e5384f', marginRight: '10px' }}
              />
            ) : (
              <CreateIcon sx={{ color: '#e5384f', marginRight: '10px' }} />
            )}
            <Typography sx={{ color: 'black', fontWeight: '500' }}>
              {isWatch || isEdit || isWrite ? '목록으로' : '일기 작성'}
            </Typography>
          </Button>
        </Box>

        {isWrite || isEdit || isWatch ? (
          <EditDiary
            isWatch={isWatch}
            isEdit={isEdit}
            handleAddDiary={handleAddDiary}
            selectedDiary={selectedDiary}
            setIsEdit={setIsEdit}
            setIsWrite={setIsWrite}
            handleEditDiary={handleEditDiary}
          />
        ) : (
          <DiaryList
            allDiary={allDiary}
            setIsWatch={setIsWatch}
            setSelectedDiary={setSelectedDiary}
            setAllDiary={setAllDiary}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Diary;
