import React from 'react';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Reminder from '../../api/api';
import { Diary } from '../../types/diary';

interface DeleteDiaryButtonProps {
  deleteDiary: Diary;
  setDiaryList: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DeleteDiaryButton = ({
  setDiaryList,
  deleteDiary,
}: DeleteDiaryButtonProps) => {
  const handleClickDelButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteDiary(deleteDiary.id);
  };

  const handleDeleteDiary = async (delId: number) => {
    try {
      await Reminder.delete(`/diaries/${delId}`);
      setDiaryList(prev => prev?.filter(diary => diary.id !== delId));
    } catch (err) {
      window.alert(
        '일기를 삭제하는 데 오류가 발생했습니다. 다시 시도해 주세요.',
      );
      console.error(err);
    }
  };

  return (
    <IconButton
      onClick={e => handleClickDelButton(e)}
      sx={{
        marginLeft: 'auto',
      }}
    >
      <DeleteForeverIcon
        sx={{
          fontSize: '26px',
          color: theme => theme.palette.primary.dark,
        }}
      />
    </IconButton>
  );
};

export default DeleteDiaryButton;
