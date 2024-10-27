import React from 'react';
import DiaryIcon from '../../assets/diaryIcon.png';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Reminder from '../../api/api';
import { Diary } from './Diary';

interface DiaryListProps {
  allDiary: Diary[];
  setIsWatch: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDiary: React.Dispatch<React.SetStateAction<Diary | null>>;
  setAllDiary: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryList = ({
  allDiary,
  setIsWatch,
  setSelectedDiary,
  setAllDiary,
}: DiaryListProps) => {
  const handleDeleteDiary = async (delId: number) => {
    try {
      await Reminder.delete(`/diaries/${delId}`);
      setAllDiary(prev => prev?.filter(diary => diary.id !== delId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <List sx={{ width: '79vw', marginLeft: '20px' }}>
        {allDiary.map(diary => {
          return (
            <ListItem
              onClick={() => {
                setIsWatch(true);
                setSelectedDiary(diary);
              }}
              key={diary.id}
              sx={{
                diplay: 'flex',
                alignItems: 'center',
                paddingY: '12px',
                borderBottom: '1px solid lightgray',
                ':hover': {
                  backgroundColor: theme => theme.palette.primary.light,
                },
                cursor: 'pointer',
              }}
            >
              <img src={DiaryIcon} alt="diary" width="45px" />
              <Typography sx={{ fontSize: '15px', marginLeft: '18px' }}>
                {diary.date}
              </Typography>
              {/*<Typography sx={{ fontSize: '15px', marginLeft: '10px' }}>
                03:12
              </Typography>*/}
              <Typography sx={{ fontSize: '18px', marginLeft: '45px' }}>
                {diary.title}
              </Typography>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteDiary(diary.id);
                }}
                sx={{
                  marginLeft: 'auto',
                }}
              >
                <DeleteForeverIcon
                  sx={{
                    color: theme => theme.palette.primary.dark,
                    fontSize: '30px',
                  }}
                />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default DiaryList;
