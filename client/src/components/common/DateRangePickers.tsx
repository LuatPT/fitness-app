import * as React from 'react';
import { addDays } from 'date-fns';
import { useState } from 'react';
import DatePicker from "react-multi-date-picker";

export default function DateRangePickers(props){
  const {handleChangeDateRange, dateRange} = props;
  const handleSelect=(items)=>{
    handleChangeDateRange(items.map(ele => ele.format("YYYY-MM-DD")))
  }
  
  return <DatePicker value={dateRange} onChange={handleSelect} range/>
}