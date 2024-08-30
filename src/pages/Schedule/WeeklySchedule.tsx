import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import 'moment/locale/ko';

const week = ['월', '화', '수', '목', '금', '토', '일'];
const time = Array.from({ length: 24 }, (_, i) => i);

const WeeklySchedule = () => {
  return (
    <>
      <TableContainer
        sx={{
          marginLeft: '365px',
          paddingLeft: '20px',
          position: 'fixed',
          width: '1290px',
          maxHeight: '810px',
          overflowY: 'scroll',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {week.map((day, idx) => {
                return (
                  <TableCell sx={{ textAlign: 'center', position: 'relative' }}>
                    <Typography>{day}</Typography>
                    <Typography
                      sx={{
                        marginTop: '10px',
                        fontSize: '20px',
                        color: new Date().getDay() - 1 === idx ? 'white' : '',
                      }}
                    >
                      {moment()
                        .day(idx + 1)
                        .format('DD')}
                    </Typography>
                    {new Date().getDay() - 1 === idx && (
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#e5384f',
                          position: 'absolute',
                          top: '45px',
                          left: '70.5px',
                          zIndex: '-1',
                        }}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {time.map((hour, _) => {
              return (
                <TableRow>
                  {week.map((day, i) => {
                    return (
                      <TableCell
                        sx={{
                          textAlign: 'center',
                          position: 'relative',
                          borderRight: '1px solid lightgray',
                          height: '20px',
                          ':hover': {
                            backgroundColor: '#fff5f6',
                          },
                        }}
                      >
                        {i === 0 && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '-8px',
                              left: '-18px',
                              fontSize: '11px',
                              fontWeight: '300',
                            }}
                          >
                            {hour}
                          </Box>
                        )}
                        {hour === 23 && i === 0 && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '45px',
                              left: '-18px',
                              fontSize: '11px',
                              fontWeight: '300',
                            }}
                          >
                            24
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WeeklySchedule;
