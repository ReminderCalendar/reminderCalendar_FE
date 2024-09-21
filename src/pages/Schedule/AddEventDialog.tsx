import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Input,
  IconButton,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  DialogActions,
  Button,
  Box,
  Tooltip,
} from '@mui/material';
// import { Select, Option } from '@mui/joy';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventAPI from '../../api/EventAPI';
import { Schedule } from './WeeklySchedule';

type Event = { title: string; content: string; review: string };
interface AddEventDialogProps {
  addEventDialogOpen: boolean;
  setAddEventDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /* eslint-disable-next-line no-unused-vars */
  onAddOrEditEvent: (event: Schedule) => void;
  isEditMode: boolean;
  eventToEdit: Schedule | null;
  setEventToEdit: React.Dispatch<React.SetStateAction<Schedule | null>>;
}

const emoji = [
  ['😶', '보통', 'NEUTRAL'],
  ['😀', '즐거움', 'HAPPY'],
  ['🥰', '행복', 'LOVE'],
  ['😭', '슬픔', 'SAD'],
  ['😡', '화남', 'ANGRY'],
  ['🫣', '부끄러움', 'SHY'],
  ['🚫', '없음', ''],
];

const AddEventDialog = ({
  addEventDialogOpen,
  setAddEventDialogOpen,
  onAddOrEditEvent,
  isEditMode,
  eventToEdit,
  setEventToEdit,
}: AddEventDialogProps) => {
  const [isAlldayChecked, setAlldayChecked] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    eventToEdit?.eventDate ? dayjs(eventToEdit.eventDate) : null,
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>();
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>();
  const [eventDeatil, setEventDetail] = useState<Event>({
    title: eventToEdit?.title || '',
    content: eventToEdit?.content || '',
    review: eventToEdit?.review || '',
  });
  const [reviewFaceName, setReviewFaceName] = useState<string>(
    eventToEdit?.emotion || '',
  );
  const [address, setAddress] = useState<string>('');
  const [isFull, setIsFull] = useState<boolean>(false);

  const handleSave = async () => {
    if (eventToEdit) {
      //일정 수정 모드일떄
      const editData = new FormData();
      if (eventDeatil.title !== '' && eventDeatil.title !== eventToEdit.title)
        editData.append('title', eventDeatil.title);
      if (
        eventDeatil.content !== '' &&
        eventDeatil.content !== eventToEdit.content
      )
        editData.append('content', eventDeatil.content);
      if (
        eventDeatil.review !== '' &&
        eventDeatil.review !== eventToEdit.review
      )
        editData.append('review', eventDeatil.review);
      if (
        selectedDate &&
        selectedDate.format('YYYY-MM-DD') !== eventToEdit.eventDate
      )
        editData.append('eventDate', selectedDate.format('YYYY-MM-DD'));
      if (reviewFaceName !== '' && reviewFaceName !== eventToEdit.emotion)
        editData.append('emotion', reviewFaceName);
      //시간 default dayjs 형식으로 안되는문제 해결

      try {
        const { data } = await EventAPI.patch(
          `/events/${eventToEdit.id}`,
          editData,
        );
        setEventToEdit(data);
        onAddOrEditEvent(data);

        setAddEventDialogOpen(false);
        setAlldayChecked(false);
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setEventDetail({ title: '', content: '', review: '' });
        setReviewFaceName('');
        setIsFull(false);
      } catch (err) {
        console.error('Error:', err.response?.data || err.message);
      }
    } else {
      //일정 추가 모드일때
      if (eventDeatil.title === '') {
        window.alert('제목 입력은 필수입니다:)');
        return;
      } else if (!selectedDate) {
        window.alert('날짜 선택은 필수입니다:)');
        return;
      }

      const formData = new FormData();
      formData.append('title', eventDeatil.title);
      formData.append('eventDate', selectedDate.format('YYYY-MM-DD'));
      if (eventDeatil.content !== '') {
        formData.append('content', eventDeatil.content);
      }
      if (eventDeatil.review !== '') {
        formData.append('review', eventDeatil.review);
      }
      if (reviewFaceName !== '') formData.append('emotion', reviewFaceName);
      if (isAlldayChecked) {
        formData.append('allDay', 'true');
      } else {
        if (selectedStartTime && selectedEndTime) {
          formData.append('allDay', 'false');
          formData.append('startTime', selectedStartTime.format('HH:mm'));
          formData.append('endTime', selectedEndTime.format('HH:mm'));
        } else {
          window.alert('일정 시간을 설정해주세요 :)');
          return;
        }
      }
      formData.append('repeatType', 'NONE');
      formData.append('notificationType', 'NONE');
      formData.append('notificationTime', 'ON_TIME');

      try {
        const { data } = await EventAPI.post('/events', formData);
        onAddOrEditEvent(data);

        setAddEventDialogOpen(false);
        setAlldayChecked(false);
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setEventDetail({ title: '', content: '', review: '' });
        setReviewFaceName('');
        setIsFull(false);
      } catch (err) {
        console.error('Error:', err.response?.data || err.message);
      }
    }
  };

  const handleClickEmoji = (faceName: string) => {
    if (faceName === '보통') setReviewFaceName('NEUTRAL');
    else if (faceName === '즐거움') setReviewFaceName('HAPPY');
    else if (faceName === '행복') setReviewFaceName('LOVE');
    else if (faceName === '슬픔') setReviewFaceName('SAD');
    else if (faceName === '화남') setReviewFaceName('ANGRY');
    else if (faceName === '부끄러움') setReviewFaceName('SHY');
    else setReviewFaceName('');
  };

  return (
    <Dialog
      open={addEventDialogOpen}
      onClose={() => setAddEventDialogOpen(false)}
      maxWidth={isFull ? 'sm' : 'xs'}
      fullWidth
    >
      <IconButton
        sx={{ marginLeft: 'auto' }}
        onClick={() => setAddEventDialogOpen(false)}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          placeholder="제목 추가"
          value={eventDeatil.title}
          onChange={e =>
            setEventDetail(prev => ({ ...prev, title: e.target.value }))
          }
          sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '3px',
            }}
          >
            <Typography marginRight="10px">날짜:</Typography>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              sx={{
                width: '165px',
                '& .MuiOutlinedInput-root': { height: '35px' },
              }}
            />
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            height="60px"
          >
            <Typography marginRight="10px">시간:</Typography>
            <TimePicker
              value={selectedStartTime}
              onChange={setSelectedStartTime}
              format="HH:mm"
              sx={{
                width: '116px',
                '& .MuiOutlinedInput-root': { height: '35px' },
              }}
              disabled={isAlldayChecked}
            />
            <Typography margin="0 6px" fontSize="30px" fontWeight="300">
              -
            </Typography>
            <TimePicker
              value={selectedEndTime}
              onChange={setSelectedEndTime}
              format="HH:mm"
              sx={{
                width: '116px',
                '& .MuiOutlinedInput-root': { height: '35px' },
                marginRight: '20px',
              }}
              disabled={isAlldayChecked}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAlldayChecked}
                  onChange={() => setAlldayChecked(!isAlldayChecked)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      color: theme => theme.palette.primary.dark,
                    },
                    '&.MuiCheckbox-root': {
                      padding: 0.5,
                    },
                  }}
                />
              }
              label="종일"
            />
          </Stack>
        </LocalizationProvider>
        {isFull && (
          <>
            <Stack marginBottom="20px">
              <Typography marginRight="10px">알림:</Typography>
              {/* <Select placeholder="이메일 알림 시간 설정">
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="fish">Fish</Option>
                <Option value="bird">Bird</Option>
              </Select> */}
            </Stack>
            <Stack marginBottom="20px" display="flex" flexDirection="row">
              <Typography marginRight="10px">주소:</Typography>
              <Input
                value={address}
                onChange={e => setAddress(e.target.value)}
                sx={{ width: '330px' }}
              />
            </Stack>
          </>
        )}
        <TextField
          id="standard-textarea"
          label="내용 추가"
          placeholder="Placeholder"
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginTop: '5px' }}
          value={eventDeatil.content}
          onChange={e =>
            setEventDetail(prev => ({ ...prev, content: e.target.value }))
          }
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            width: '180px',
            height: '30px',
            fontSize: '12px',
            marginY: '10px',
          }}
        >
          Upload files
          {/*<input
                type="file"
                onChange={event => console.log(event.target.files)}
              />*/}
        </Button>
        {isFull ? (
          <Box>
            <Typography marginTop="20px">오늘의 일정은 어땠나요?</Typography>
            <TextField
              id="standard-textarea"
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              sx={{ marginTop: '5px' }}
              value={eventDeatil.review}
              onChange={e =>
                setEventDetail(prev => ({ ...prev, review: e.target.value }))
              }
            />
            <Stack display="flex" flexDirection="row">
              {emoji.map(face => {
                return (
                  <Tooltip
                    key={face[1]}
                    title={face[1]}
                    placement="bottom"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -10],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <Box
                      onClick={() => handleClickEmoji(face[1])}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '3px',

                        width: '30px',
                        height: '30px',
                        fontSize: '22px',
                        borderRadius: '5px',
                        ':hover': {
                          backgroundColor: 'lightGray',
                        },
                        cursor: 'pointer',
                        backgroundColor:
                          reviewFaceName === face[2]
                            ? theme => theme.palette.primary.main
                            : 'none',
                      }}
                    >
                      {face[0]}
                    </Box>
                  </Tooltip>
                );
              })}
            </Stack>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsFull(!isFull)}>
          {isFull ? '옵션 숨기기' : '옵션 더보기'}
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {isEditMode ? '수정' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;
