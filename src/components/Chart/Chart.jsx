import { Inter } from 'next/font/google'
import classes from '@/components/Chart/Chart.module.css'
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register (
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export function Chart(props) {

  
  console.log(props);
  let labels = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月"];

  const data = {
    labels : labels,
    datasets: [
      {
        label: "A社",
        data: [65, 59, 60, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "B社",
        data: [60, 55, 57, 61, 75, 50],
        borderColor: "rgb(75, 100, 192)",
      },
    ]
  };

  return (
    <div className={classes.div}>
      <h3>グラフ表示</h3>
      <div>
        <Line
          data = {data}
          // options = {options}
        
        ></Line>
      </div>
    </div>
  )
}
