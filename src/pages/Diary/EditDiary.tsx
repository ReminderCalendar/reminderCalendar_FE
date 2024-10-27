import React from 'react';
import Reminder from '../../api/api';
import { Box, Stack, Input, Button, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Diary } from './Diary';

interface EditDiaryProps {
  isWatch: boolean;
  isEdit: boolean;
  /* eslint-disable-next-line no-unused-vars */
  handleAddDiary: (diary: Diary) => void;
  selectedDiary: Diary | null;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWrite: React.Dispatch<React.SetStateAction<boolean>>;
  /* eslint-disable-next-line no-unused-vars */
  handleEditDiary: (diary: Diary) => void;
}

const EditDiary = ({
  isWatch,
  isEdit,
  handleAddDiary,
  selectedDiary,
  setIsEdit,
  setIsWrite,
  handleEditDiary,
}: EditDiaryProps) => {
  const [date, setDate] = React.useState<Dayjs | null>(
    isEdit ? dayjs(selectedDiary?.date, 'YYYY-MM-DD') : dayjs(),
  );
  const [diaryDetail, setDiaryDetail] = React.useState({
    title: selectedDiary ? selectedDiary.title : '',
    content: selectedDiary ? selectedDiary.content : '',
  });

  const handleClickSave = async () => {
    if (diaryDetail.title === '' || diaryDetail.content === '') {
      alert('일기 제목과 내용을 작성해주세요 :)');
      return;
    }
    if (!date) {
      alert('날짜를 선택해주세요 :)');
      return;
    }

    if (isEdit) {
      const { data } = await Reminder.patch(`diaries/${selectedDiary?.id}`, {
        title: diaryDetail.title,
        content: diaryDetail.content,
        date: date.format('YYYY-MM-DD'),
      });
      handleEditDiary(data);
      setIsEdit(false);
    } else {
      try {
        const { data } = await Reminder.post('/diaries', {
          title: diaryDetail.title,
          content: diaryDetail.content,
          date: date.format('YYYY-MM-DD'),
        });
        handleAddDiary(data);
      } catch (err) {
        console.error(err);
      }
      setIsWrite(false);
    }

    setDiaryDetail(prev => ({ title: '', content: '' }));
    setDate(dayjs());
  };

  return (
    <Stack
      sx={{
        diplay: 'flex',
        alignItems: 'center',
        backgroundColor: theme => theme.palette.primary.light,
        marginTop: '15px',
        marginLeft: '30px',
        width: '78vw',
        height: '720px',
        borderRadius: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '20px 30px 0 auto',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ height: '50px' }}>
            <DatePicker
              defaultValue={
                isWatch || isEdit
                  ? dayjs(selectedDiary?.date, 'YYYY-MM-DD')
                  : dayjs()
              }
              onChange={setDate}
              slotProps={{
                openPickerButton: {
                  color: 'primary',
                },
                inputAdornment: {
                  position: 'start',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  width: '170px',
                  height: '40px',
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      {isWatch ? (
        <Typography sx={{ fontSize: '18px', marginTop: '10px' }}>
          {selectedDiary?.title}
        </Typography>
      ) : (
        <Input
          placeholder="일기 제목"
          sx={{
            width: '400px',
            marginTop: '8px',
          }}
          inputProps={{ style: { fontSize: '18px' } }}
          value={diaryDetail.title}
          onChange={e =>
            setDiaryDetail(prev => ({ ...prev, title: e.target.value }))
          }
        />
      )}
      {isWatch ? (
        <Typography
          sx={{
            width: '1280px',
            height: '480px',
            padding: '30px 50px',
            marginTop: '20px',
            border: '1px solid',
            borderRadius: '10px',
            borderColor: theme => theme.palette.primary.main,
            overflowY: 'auto',
          }}
        >
          {selectedDiary?.content}
        </Typography>
      ) : (
        <Input
          placeholder="일기를 작성하세요 :)"
          multiline
          rows={18}
          disableUnderline={true}
          sx={{
            marginTop: '60px',
            width: '1420px',
            overflowY: 'scroll',
            paddingLeft: '52px',
          }}
          value={diaryDetail.content}
          onChange={e =>
            setDiaryDetail(prev => ({ ...prev, content: e.target.value }))
          }
        />
      )}
      {!isWatch && (
        <Button
          variant="contained"
          onClick={handleClickSave}
          sx={{
            marginLeft: 'auto',
            marginTop: '30px',
            marginRight: '45px',
          }}
        >
          {isEdit ? '수정' : '저장'}
        </Button>
      )}
    </Stack>
  );
};

export default EditDiary;
