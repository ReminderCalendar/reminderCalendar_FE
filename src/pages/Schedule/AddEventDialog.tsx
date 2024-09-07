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
  const [isAlldayChecked, setAlldayChecked] = React.useState<boolean>(false);

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
                '& .MuiOutlinedInput-root': { height: '40px' },
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
                  width: '105px',
                  '& .MuiOutlinedInput-root': { height: '40px' },
                }}
                disabled={isAlldayChecked}
              />
              <Typography margin="0 8px" fontSize="30px" fontWeight="300">
                -
              </Typography>
              <TimePicker
                defaultValue={dayjs()}
                format="hh:mm"
                sx={{
                  width: '105px',
                  '& .MuiOutlinedInput-root': { height: '40px' },
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
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          id="standard-textarea"
          label="내용 추가"
          placeholder="Placeholder"
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginTop: '10px' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
