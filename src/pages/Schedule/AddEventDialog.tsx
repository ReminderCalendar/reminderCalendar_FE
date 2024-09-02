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
  //   return <Box sx={{ display: addEventDialogOpen ? 'block' : 'none' }}>box</Box>;
  return (
    <Dialog
      open={addEventDialogOpen}
      onClose={() => setAddEventDialogOpen(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogActions>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </DialogActions>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Input placeholder="제목 추가" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ width: '180px', marginTop: '20px' }} />
          <DemoContainer components={['TimePicker', 'TimePicker']}>
            <Stack display="flex" flexDirection="row" alignItems="center">
              <TimePicker
                defaultValue={dayjs()}
                format="hh:mm"
                sx={{ width: '130px' }}
              />
              <Typography margin="0 20px" fontSize="50px" fontWeight="100">
                -
              </Typography>
              <TimePicker
                defaultValue={dayjs()}
                format="hh:mm"
                sx={{ width: '130px' }}
              />
            </Stack>
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
