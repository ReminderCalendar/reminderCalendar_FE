import React from 'react';
import { IconButton, ButtonGroup } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface WeeklyMoveButtonProps {
  prevOrNextNum: number;
  setPrevOrNextNum: React.Dispatch<React.SetStateAction<number>>;
}

const WeeklyMoveButton = ({
  prevOrNextNum,
  setPrevOrNextNum,
}: WeeklyMoveButtonProps) => {
  return (
    <ButtonGroup sx={{ marginLeft: 'auto' }}>
      <IconButton
        size="large"
        onClick={() => setPrevOrNextNum(prevOrNextNum - 7)}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => setPrevOrNextNum(prevOrNextNum + 7)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default WeeklyMoveButton;
