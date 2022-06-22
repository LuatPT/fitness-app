import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import axios from "axios";

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
  const { row } = props;
    
  const amountValue = React.useRef();
  const repsValue = React.useRef();
  const setValue = React.useRef();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(row.amount);
  const [formData, setFormData] = useState(row);

  useEffect(() => {
    // console.log('Form data updated', formData)
  }, [formData])

 const updateFormData = (e) => {  
    e.preventDefault()  
    setFormData({...formData, amount: parseInt(amountValue.current.value), reps: parseInt(repsValue.current.value), sets: parseInt(setValue.current.value) })
    // console.log("amountValue.current.value" +amountValue.current.value)
    updateData( {amount: amountValue.current.value, reps: repsValue.current.value, sets: setValue.current.value})
  }

  //Mock to test- update when have backend
  const updateData = (formDataValue) => {
    console.log(row)
    const exercise = {
            ...row,
      amount: formDataValue.amount,
      reps: formDataValue.reps,
      sets: formDataValue.sets,
    }
    console.log(exercise)
    axios({
      method: 'put',
      url: 'http://localhost:3002/api/v1/exercises/'+ row.id,
      data: exercise
    });
  }
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
            <IconButton color="primary" aria-label="Update" onClick={(updateFormData)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Delete">
               <DeleteIcon />
            </IconButton>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
 }



const TableList = () => {
  
  const [exercises,setExercises] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://localhost:3002/api/v1/exercises").then((response) =>setExercises(response.data)) 
    };
    fetchData();
}, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Exercise</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Amount&nbsp;(lbs)</TableCell>
            <TableCell align="right">Rep</TableCell>
            <TableCell align="right">Set</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableList