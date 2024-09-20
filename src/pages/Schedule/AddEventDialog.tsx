import React from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import { Dayjs } from 'dayjs';
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
  onAddEvent: (newEvent: Schedule) => void;
}

const emoji = [
  ['😶', '보통'],
  ['😀', '즐거움'],
  ['🥰', '행복'],
  ['😭', '슬픔'],
  ['😡', '화남'],
  ['🫣', '부끄러움'],
  ['🚫', '없음'],
];

const AddEventDialog = ({
  addEventDialogOpen,
  setAddEventDialogOpen,
  onAddEvent,
}: AddEventDialogProps) => {
  const [isAlldayChecked, setAlldayChecked] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>();
  const [selectedStartTime, setSelectedStartTime] =
    React.useState<Dayjs | null>();
  const [selectedEndTime, setSelectedEndTime] = React.useState<Dayjs | null>();
  const [eventDeatil, setEventDetail] = React.useState<Event>({
    title: '',
    content: '',
    review: '',
  });
  const [reviewFaceName, setReviewFaceName] = React.useState<string>('');
  const [isFull, setIsFull] = React.useState<boolean>(false);

  const handleClickAddEventBtn = async () => {
    if (eventDeatil.title === '') {
      window.alert('제목 입력은 필수입니다:)');
      return;
    } else if (!selectedDate) {
      window.alert('날짜 선택은 필수입니다:)');
      return;
    }
    try {
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

        formData.append('repeatType', 'NONE');
        formData.append('notificationType', 'NONE');
        formData.append('notificationTime', 'ON_TIME');

        const { data } = await EventAPI.post('/events', formData);
        onAddEvent(data);

        setAddEventDialogOpen(false);
        setAlldayChecked(false);
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setEventDetail({ title: '', content: '', review: '' });
        setReviewFaceName('');
        setIsFull(false);
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
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
                width: '180px',
                '& .MuiOutlinedInput-root': { height: '38px' },
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
              //defaultValue={dayjs()}
              value={selectedStartTime}
              onChange={setSelectedStartTime}
              format="HH:mm"
              sx={{
                width: '116px',
                '& .MuiOutlinedInput-root': { height: '38px' },
              }}
              disabled={isAlldayChecked}
            />
            <Typography margin="0 6px" fontSize="30px" fontWeight="300">
              -
            </Typography>
            <TimePicker
              //defaultValue={dayjs().add(1, 'hour')}
              value={selectedEndTime}
              onChange={setSelectedEndTime}
              format="HH:mm"
              sx={{
                width: '116px',
                '& .MuiOutlinedInput-root': { height: '38px' },
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
        <Button variant="contained" onClick={handleClickAddEventBtn}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;
