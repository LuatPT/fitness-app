import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { apiUrl } from '../../utils/constants';
import axios from "axios";
import ExerciseChart from './ExerciseChart';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ExerciseModal(props) {
  const {open,code, name, handleClose} = props;
  const [exercises,setExercises] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(apiUrl+"/exerciseAnalytics/"+code).then((response) =>setExercises(response.data))
    };
    fetchData();
  }, [code]);

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
          <div>
            <ExerciseChart list={exercises} />
          </div>
        </Box>
      </Modal>
  );
}
