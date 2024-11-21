import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Input, Button, Stack, styled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Diary } from '../../types/diary';
import ReminderAPI from '../../api/api';

const EditContent = styled(Stack)(({ theme }) => ({
  diplay: 'flex',
  alignItems: 'center',

  height: '600px',
  padding: '30px 40px',
  marginTop: '10px',

  borderRadius: '25px',
  backgroundColor: theme.palette.primary.light,
}));

const TitleInput = styled(Input)({
  width: '400px',
});

const ContentInput = styled(Input)({
  width: '100%',
  paddingLeft: '20px',
  marginTop: '30px',
});

const SubmitButton = styled(Button)({
  marginLeft: 'auto',
  marginTop: '20px',
});

const DiaryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originDiary, setOriginDiary] = React.useState<Diary | null>();

  const [editingDiary, setEditingDiary] = React.useState({
    date: originDiary ? dayjs(originDiary.date, 'YYYY-MM-DD') : dayjs(),
    title: originDiary ? originDiary.title : '',
    content: originDiary ? originDiary.content : '',
  });

  React.useEffect(() => {
    const getDiary = async () => {
      try {
        const { data } = await ReminderAPI.get(`/diaries/${id}`);
        setOriginDiary(data);
      } catch (err) {
        window.alert(
          '일기를 불러오는 데 오류가 발생했습니다. 다시 시도해 주세요.',
        );
        window.location.replace('/diary');
      }
    };

    if (id === undefined) setOriginDiary(null);
    else getDiary();
  }, [id]);

  const handleEditDiary = (key: string, value: Dayjs | string | null) => {
    setEditingDiary(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateDiary = async () => {
    if (!originDiary) return;

    const updateFields: Partial<Diary> = {};
    if (!dayjs(originDiary.date).isSame(editingDiary.date, 'day'))
      updateFields.date = editingDiary.date.format('YYYY-MM-DD');
    if (originDiary.title !== editingDiary.title)
      updateFields.title = editingDiary.title;
    if (originDiary.content !== editingDiary.content)
      updateFields.content = editingDiary.content;

    if (Object.keys(updateFields).length === 0) {
      window.alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      await ReminderAPI.patch(`diaries/${originDiary?.id}`, updateFields);
      setEditingDiary({ date: dayjs(), title: '', content: '' });

      navigate(`/diary/detail/${originDiary.id}`);
    } catch (err) {
      window.alert(
        '데이터를 수정하는 데 오류가 발생했습니다. 다시 시도해 주세요.',
      );
      console.error(err);
    }
  };

  const handleCreateDiary = async () => {
    if (editingDiary.title === '' || editingDiary.content === '') {
      alert('일기 제목과 내용을 작성해주세요 :)');
      return;
    }

    try {
      const { data } = await ReminderAPI.post('/diaries', {
        title: editingDiary.title,
        content: editingDiary.content,
        date: editingDiary.date.format('YYYY-MM-DD'),
      });
      setEditingDiary({ date: dayjs(), title: '', content: '' });

      navigate(`/diary/detail/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitDiary = () => {
    if (originDiary) handleUpdateDiary();
    else handleCreateDiary();
  };

  return (
    <Stack>
      <EditContent>
        <Box marginLeft="auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ height: '50px' }}>
              <DatePicker
                defaultValue={
                  originDiary ? dayjs(originDiary?.date, 'YYYY-MM-DD') : dayjs()
                }
                onChange={newDate => handleEditDiary('date', newDate)}
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

        <TitleInput
          placeholder="일기 제목"
          value={editingDiary.title}
          onChange={e => handleEditDiary('title', e.target.value)}
          inputProps={{ style: { fontSize: '18px' } }}
        />
        <ContentInput
          placeholder="일기를 작성하세요 :)"
          multiline
          rows={20}
          disableUnderline={true}
          value={editingDiary.content}
          onChange={e => handleEditDiary('content', e.target.value)}
        />
      </EditContent>
      <SubmitButton variant="contained" onClick={handleSubmitDiary}>
        {originDiary ? '수정' : '등록'}
      </SubmitButton>
    </Stack>
  );
};

export default DiaryEditPage;
