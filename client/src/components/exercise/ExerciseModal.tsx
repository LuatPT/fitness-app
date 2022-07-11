import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ExerciseChart from './ExerciseChart';
import DateRangePickers from '../common/DateRangePickers';
import Grid from '@mui/material/Grid';
import moment from 'moment'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ExerciseModal(props) {
  const {open, codes, name, handleClose} = props;
  
  const [dateRange,setDateRange] = useState(
    [
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment(new Date()).format("YYYY-MM-DD")
    ]
  );
 
  const handleChangeDateRange = (dateRange) => {
    setDateRange(dateRange)
  }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name.toUpperCase()}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Exercise Analyticts
          </Typography> */}
              <DateRangePickers dateRange={dateRange} handleChangeDateRange={handleChangeDateRange} />
              <ExerciseChart dateRange={dateRange} codes={codes}/>
        </Box>
      </Modal>
  );
}
