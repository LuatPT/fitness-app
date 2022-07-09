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
import CommonAlert from './common/CommonAlert';
import DateTimePickers from './common/DateTimePickers';
import ExerciseModal from './exercise/ExerciseModal';
import Row from './Row';
import { apiUrl } from '../utils/constants';
import { getDateFromNow } from '../utils/commonFunc';

const TableList = () => {
  
  const [exercises,setExercises] = useState([]);
  
  const today = getDateFromNow(new Date());

  const [createAt,setCreateAt] = useState(today);
  const [alertInfo,setAlertInfo] = useState({
    actionType:"",
    color: "",
    message: ""
  });

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(apiUrl+"/exercisesByDate?creatAt="+createAt).then((response) =>setExercises(response.data))
    };
    fetchData();
    
  }, [createAt]);

  const handleChange = (date) => {
    setCreateAt(getDateFromNow(date))
  }
  return (
    <div>
    <DateTimePickers handleChange={handleChange} />
    <CommonAlert {...alertInfo} />
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Amount&nbsp;(lbs)</TableCell>
            <TableCell align="center">Rep</TableCell>
            <TableCell align="center">Set</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.length ? exercises.map((row) => (
            <Row key={row.name} row={row} setAlertInfo={setAlertInfo}/>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TableList