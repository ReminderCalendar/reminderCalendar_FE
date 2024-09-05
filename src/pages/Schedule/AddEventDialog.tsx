import React from 'react';
import {
  Dialog,
  DialogContent,
  Input,
  IconButton,
  DialogActions,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AddEventDialogProps {
  addEventDialogOpen: boolean;
  setAddEventDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEventDialog = ({
  addEventDialogOpen,
  setAddEventDialogOpen,
}: AddEventDialogProps) => {
  return (
    <Dialog
      open={addEventDialogOpen}
      onClose={() => setAddEventDialogOpen(false)}
      maxWidth="xs"
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
          sx={{ fontSize: '18px', fontWeight: 'bold' }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Typography marginRight="10px">날짜:</Typography>
            <DatePicker
              sx={{
                width: '180px',
                '& .MuiOutlinedInput-root': { height: '45px' },
              }}
            />
          </Stack>
          <DemoContainer components={['TimePicker', 'TimePicker']}>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              height="60px"
            >
              <Typography marginRight="10px">시간:</Typography>
              <TimePicker
                defaultValue={dayjs()}
                format="hh:mm"
                sx={{
                  width: '110px',
                  '& .MuiOutlinedInput-root': { height: '50px' },
                }}
              />
              <Typography margin="0 10px" fontSize="30px" fontWeight="300">
                -
              </Typography>
              <TimePicker
                defaultValue={dayjs()}
                format="hh:mm"
                sx={{
                  width: '110px',
                  '& .MuiOutlinedInput-root': { height: '50px' },
                }}
              />
            </Stack>
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
