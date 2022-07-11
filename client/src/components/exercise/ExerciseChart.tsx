import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Chart } from "react-google-charts";
import { apiUrl } from '../../utils/constants';
 
const ExerciseChart = (props) => {
  const {codes,dateRange } = props;
  const [exercises,setExercises] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(apiUrl+"/exerciseAnalytics",
         {
          codes: codes,
          dateRange: dateRange
        }
      ).then((response) => {setExercises(response.data)
        console.log(response)
      })
    };
    
    if(dateRange.length == 2){
      fetchData();
    }
  }, [codes, dateRange]);

  const options = {
    chart: {
      title: "Exercise",
    },
    width: 900,
    height: 400,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "Temps" },
      1: { axis: "Daylight" },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: "Temps (Celsius)" },
        Daylight: { label: "Daylight" },
      },
    },
  };

  const dataChart = [
    [
      { type: "date", label: "Day" },
      "Amount",
      "Set",
    ],
    [new Date(2014, 0), -0.5, 5.7],
    [new Date(2014, 1), 0.4, 8.7],
  ];

  exercises

  // console.log(exercises);
  return <Chart chartType="Line" width="100%" height="400px" data={dataChart} options={options}/>
}

export default ExerciseChart