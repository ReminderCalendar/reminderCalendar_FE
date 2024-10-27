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
  Select,
  MenuItem,
  styled,
} from '@mui/material';
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
import ReminderAPI from '../../api/api';
import DaumPostcode from 'react-daum-postcode';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const DetailAddressInput = styled('input')({
  border: '1px solid lightgray',
  borderRadius: '5px',
  width: '400px',
  height: '35px',
  margin: '8px 0 20px 43px',
});

const AddEventDialog = ({
  addEventDialogOpen,
  setAddEventDialogOpen,
  onAddOrEditEvent,
  isEditMode,
  eventToEdit,
  setEventToEdit,
}: AddEventDialogProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
  const [notificationTime, setNotificationTime] = useState('NONE');
  const [isFull, setIsFull] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileID, setFileID] = useState('');
  const [isDaumAddressOpen, setDaumAddressOpen] = useState(false);
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState<string>('');
  const [detailedAddress, setDetailedAddress] = useState('');

  const completeHandler = data => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const handleClickCloseButton = async () => {
    setAddEventDialogOpen(false);
    try {
      await ReminderAPI.delete(`/files/${fileID}`);
    } catch (err) {
      console.error(err);
    }
    setFileID('');
    setFileUrl('');
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await EventAPI.post('/files', formData);
      console.log('File uploaded successfully:', data);
      setFileUrl(data.fileUrl);
      setFileID(data.id);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (isUploading) {
      window.alert('파일 업로드 중에는 저장할 수 없습니다.');
      return;
    }

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
      if (
        notificationTime !== 'NONE' &&
        notificationTime !== eventToEdit.notificationTime
      ) {
        editData.append('notificationTime', notificationTime);
      }
      if (fileUrl) {
        editData.append('file', fileUrl);
      }

      const obj = {};
      editData.forEach((val, key) => (obj[key] = val));

      try {
        const { data } = await ReminderAPI.patch(
          `/events/${eventToEdit.id}`,
          obj,
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
        setFileID('');
        setFileUrl('');
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
      if (notificationTime === 'NONE') {
        formData.append('notificationType', 'NONE');
        formData.append('notificationTime', 'ON_TIME');
      } else {
        formData.append('notificationType', 'GENERAL');
        formData.append('notificationTime', notificationTime);
      }
      if (fileUrl) {
        formData.append('file', fileUrl);
      }
      formData.append('repeatType', 'NONE');

      const obj = {};
      formData.forEach((val, key) => (obj[key] = val));

      try {
        const { data } = await ReminderAPI.post('/events', obj);
        onAddOrEditEvent(data);

        setAddEventDialogOpen(false);
        setAlldayChecked(false);
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setEventDetail({ title: '', content: '', review: '' });
        setReviewFaceName('');
        setIsFull(false);
        setFileID('');
        setFileUrl('');
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
      <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClickCloseButton}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          placeholder="제목 입력"
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
            <Stack
              marginBottom="15px"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography marginRight="10px">이메일 알림:</Typography>
              <Select
                label="알림 설정 시간"
                value={notificationTime}
                onChange={e => setNotificationTime(e.target.value)}
                sx={{ width: '150px', height: '35px' }}
              >
                <MenuItem value="NONE">알림 받지 않음</MenuItem>
                <MenuItem value="FIVE_MIN_BEFORE">5분전</MenuItem>
                <MenuItem value="ONE_HOUR_BEFORE">1시간전</MenuItem>
                <MenuItem value="ONE_DAY_BEFORE">1일전</MenuItem>
                <MenuItem>일정 시작 시</MenuItem>
              </Select>
            </Stack>
            <Stack
              marginBottom="8px"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Typography marginRight="10px">주소:</Typography>
              <Box
                sx={{
                  border: '1px solid lightgray',
                  borderRadius: '5px',
                  width: '100px',
                  height: '35px',
                  marginRight: '10px',
                }}
              >
                {zonecode}
              </Box>
              <Button
                onClick={() => setDaumAddressOpen(prev => !prev)}
                sx={{ boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.2)' }}
              >
                주소 찾기
              </Button>
            </Stack>
            {isDaumAddressOpen && <DaumPostcode onComplete={completeHandler} />}
            <Box
              sx={{
                border: '1px solid lightgray',
                borderRadius: '5px',
                width: '400px',
                height: '35px',
                marginLeft: '43px',
              }}
            >
              {address}
            </Box>
            <DetailAddressInput
              value={detailedAddress}
              onChange={e => setDetailedAddress(e.target.value)}
            />
          </>
        )}
        <TextField
          id="event-contents"
          placeholder="내용 입력"
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
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload files'}
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
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
        <Button variant="contained" onClick={handleSave} disabled={isUploading}>
          {isEditMode ? '수정' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;
