import React from 'react';
import {
  Box,
  Stack,
  IconButton,
  Typography,
  ButtonGroup,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import EditIcon from '@mui/icons-material/Edit';
import { Schedule } from './WeeklySchedule';

interface EventDetailModalProps {
  setEventDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Schedule | null;
  position: { top: number; left: number } | null;
  onDeleteEvent: () => void;
  onEditMode: () => void;
}

const EventDetailModal = ({
  setEventDetailModalOpen,
  event,
  position,
  onDeleteEvent,
  onEditMode,
}: EventDetailModalProps) => {
  const [moreEventDetail, setMoreEventDetail] = React.useState<boolean>(false);

  if (!event || !position) return null;

  const handleDeleteClick = () => {
    if (event) {
      onDeleteEvent();
      setEventDetailModalOpen(false);
    }
  };

  const handleEditClick = () => {
    if (event) {
      onEditMode();
      setEventDetailModalOpen(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 2,

        display: 'flex',
        flexDirection: 'column',

        width: '350px',
        paddingX: '8px',
        paddingBottom: '8px',

        borderRadius: '10px',

        backgroundColor: 'white',
        boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.2)',
      }}
    >
      <ButtonGroup sx={{ marginLeft: 'auto' }}>
        <IconButton size="small" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" onClick={() => setEventDetailModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </ButtonGroup>

      <Stack
        sx={{
          padding: '15px 15px 5px 15px',
          borderRadius: '10px',
          background: theme => theme.palette.primary.light,
        }}
      >
        <Typography variant="h6">{event.title}</Typography>
        <Typography variant="body2">
          {event.eventDate.substring(5, 7)}월 {event.eventDate.substring(8, 10)}
          일 · {event.startTime} - {event.endTime}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          marginTop="4px"
          alignItems="center"
        >
          {event.notificationType === 'NONE' ? (
            <NotificationsOffIcon sx={{ fontSize: '17px', color: 'red' }} />
          ) : (
            <NotificationsActiveIcon
              sx={{ fontSize: '18px', color: 'orange' }}
            />
          )}
          <Typography fontSize="13px" color="gray" marginLeft="3px">
            {event.notificationType === 'NONE'
              ? '알림 없음'
              : event.notificationTime === 'FIVE_MIN_BEFORE'
                ? '5분 전'
                : event.notificationTime === 'ONE_HOUR_BEFORE'
                  ? '1시간 전'
                  : event.notificationTime === 'ONE_DAY_BEFORE'
                    ? '1일 전'
                    : '일정 시작 시'}
          </Typography>
        </Box>
        <Typography marginTop="20px" fontSize="15px">
          {event.content}
        </Typography>
        {moreEventDetail && (
          <>
            <Divider sx={{ marginTop: '20px', marginBottom: '15px' }} />
            <Stack display="flex" flexDirection="row" alignItems="end">
              <Typography fontSize="20px">
                {event.emotion === 'NEUTRAL'
                  ? '😶'
                  : event.emotion === 'HAPPY'
                    ? '😀'
                    : event.emotion === 'LOVE'
                      ? '🥰'
                      : event.emotion === 'SAD'
                        ? '😭'
                        : event.emotion === 'ANGRY'
                          ? '😡'
                          : event.emotion === 'SHY'
                            ? '🫣'
                            : '⚪'}
              </Typography>
              <Typography variant="caption" marginBottom="2px" marginLeft="2px">
                나의 후기
              </Typography>
            </Stack>
            <Box
              border="1px solid lightgray"
              borderRadius="5px"
              marginTop="5px"
              minHeight="50px"
              fontSize="14px"
              padding="10px"
            >
              {event.review || '후기를 작성해 주세요 :)'}
            </Box>
          </>
        )}
        <Button
          onClick={() => setMoreEventDetail(!moreEventDetail)}
          sx={{
            marginTop: '10px',
            ':hover': {
              backgroundColor: 'white',
            },
          }}
        >
          {moreEventDetail ? '숨기기' : '더보기'}
        </Button>
      </Stack>
    </Box>
  );
};

export default EventDetailModal;
