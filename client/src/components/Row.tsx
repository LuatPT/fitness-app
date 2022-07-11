import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import axios from "axios";
import ExerciseModal from './exercise/ExerciseModal';
import { apiUrl } from '../utils/constants';

type GymExercise = {
  id: number,
  name: string,
  image: string,
  amount: number,
  reps: number,
  sets: number,
  price: number,
  history: Array<History>
}

type History = {
  date: string,
  customerId: string,
  amount: number,
}
const Row = (props: { row: ReturnType<typeof GymExercise> }) => {
  const { row, setAlertInfo } = props;
  const amountValue = React.useRef();
  const repsValue = React.useRef();
  const setValue = React.useRef();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(row)

 const updateFormData = (e) => {  
    e.preventDefault();
    setFormData({...formData, amount: parseInt(amountValue.current.value), reps: parseInt(repsValue.current.value), sets: parseInt(setValue.current.value) })
    updateData( {amount: amountValue.current.value, reps: repsValue.current.value, sets: setValue.current.value})
  }

  const updateData = (formDataValue) => {
    const exercise = {
            ...row,
      amount: formDataValue.amount,
      reps: formDataValue.reps,
      sets: formDataValue.sets,
    }
    axios({
      method: 'put',
      url: apiUrl+ '/exercises/'+ row.id,
      data: exercise
    }).then (() => setAlertInfo({actionType: "UPDATE", color: "success", message: "Update item in "+ row.id+ " successfully !!!" }) )
  }
  
  const deleteFormData = () => {
    setAlertInfo({actionType: "DELETE", color: "info", message: "Delete item in "+ row.id+ " successfully !!!" })
    axios({
      method: 'delete',
      url: apiUrl+ '/exercises/'+ row.id
    }).then (() => setAlertInfo({actionType: "DELETE", color: "info", message: "Delete item in "+ row.id+ " successfully !!!" }) )
  }

  return (
    <React.Fragment>
      <ExerciseModal codes={row.codes} name={row.name} open={open} handleClose={()=> setOpen(false) }/>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={()=> setOpen(!open)}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center"><Image src={row.image} alt="Image" width="200px" height="200px"/></TableCell>
        <TableCell align="right">
          <TextField inputProps={{ inputMode: 'numeric'}} defaultValue={formData.amount} inputRef={amountValue}/>
        </TableCell>
        <TableCell align="right">
          <TextField inputProps={{ inputMode: 'numeric'}} defaultValue={formData.reps} inputRef={repsValue}/>
        </TableCell>
        <TableCell align="right">
          <TextField inputProps={{ inputMode: 'numeric'}} defaultValue={formData.sets} inputRef={setValue}/>
        </TableCell>
        <TableCell align="right">
            <IconButton color="primary" aria-label="Update" onClick={updateFormData}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Delete" onClick={deleteFormData}>
               <DeleteIcon />
            </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
 }

 export default Row