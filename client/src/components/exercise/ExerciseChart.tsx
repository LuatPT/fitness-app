import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
const ExerciseChart = (props) => {
  const {list} = props;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Exercise Analytics',
      },
    },
  };
  const labels = list?.map((ele) => ele.create_at.substring(0,10));
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Amount(Lbs)',
        data: list?.map((ele) => ele.amount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Rep',
      //   data: list?.map((ele) => ele.reps),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
      // {
      //   label: 'Set',
      //   data: list?.map((ele) => ele.sets),
      //   borderColor: 'rgb(53, 162, 135)',
      //   backgroundColor: 'rgba(53, 100, 235, 0.5)',
      // },
    ],
  };

  return (
    <>
      <Line options={options} data={dataChart} />
    </>
  )
}

export default ExerciseChart