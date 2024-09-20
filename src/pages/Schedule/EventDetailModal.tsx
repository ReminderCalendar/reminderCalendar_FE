import React from 'react';
import { Box, Stack, IconButton, Typography, ButtonGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Schedule } from './WeeklySchedule';

interface EventDetailModalProps {
  setEventDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Schedule | null;
  position: { top: number; left: number } | null;
  onDeleteEvent: (delEvent: Schedule) => void;
  onEditMode: (event: Schedule) => void;
}

const EventDetailModal = ({
  setEventDetailModalOpen,
  event,
  position,
  onDeleteEvent,
  onEditMode,
}: EventDetailModalProps) => {
  if (!event || !position) return null;

  const handleDeleteClick = () => {
    if (event) {
      onDeleteEvent(event);
      setEventDetailModalOpen(false);
    }
  };

  const handleEditClick = () => {
    if (event) {
      onEditMode(event);
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

        width: '280px',
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
          padding: '15px',
          borderRadius: '10px',
          background: theme => theme.palette.primary.light,
        }}
      >
        <Typography variant="h6">{event.title}</Typography>
        <Typography variant="body2">
          {event.eventDate.substring(5, 7)}월 {event.eventDate.substring(8, 10)}
          일 · {event.startTime} - {event.endTime}
        </Typography>
        <Typography>{event.content}</Typography>
      </Stack>
    </Box>
  );
};

export default EventDetailModal;
