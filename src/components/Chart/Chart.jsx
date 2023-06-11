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
  // console.log(...props.table.map(item => item["year"]));
  // console.log(...props.table.map(item => item["year"]));
  // let labels = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月"];
  // 横軸
  
  if (props.items["id"] === 1) {
    return;
  };

  let labels = [];
  labels.push(...props.table.map(
    item => item["year"] + "年"
  ));

  // 資産額
  let assetResult = [];
  assetResult.push(...props.table.map(
    item => item["finalAssetResult"]
  ));
  // console.log(assetResult);

  // 投資額
  let investmentResult = [];
  investmentResult.push(...props.table.map(
    item => item["totalInvestmentResult"]
  ));
  // console.log(investmentResult);
  
  const data = {
    labels : labels,
    datasets: [
      {
        label: "資産額",
        // data: [65, 59, 60, 81, 56, 55],
        data: assetResult,
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "投資額",
        data: investmentResult,
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
          // redraw
        
        ></Line>
      </div>
    </div>
  )



}
