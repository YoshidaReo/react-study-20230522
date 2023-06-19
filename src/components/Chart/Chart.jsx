import { Inter } from 'next/font/google'
import classes from '@/components/Chart/Chart.module.css'
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
);

export function ChartDisplay(props) {


  let labels = [];
  labels.push(...props.table.map(
    item => item["year"] + "年目"
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

  // 利益額
  let bottomLineResult = [];
  bottomLineResult.push(...props.table.map(
    item => item["bottomLine"]
  ));

  // 利益率
  let returnOnAssetsResult = [];
  returnOnAssetsResult.push(...props.table.map(
    item => item["returnOnAssets"]
  ));
  // bottomLine: (finalAssetResult - totalInvestmentResult),
  // returnOnAssets: ((finalAssetResult - totalInvestmentResult) / finalAssetResult * 100),
  
  const data = {
    labels : labels,
    datasets: [
      {
        // type: Line,
        label: "資産額",
        // data: [65, 59, 60, 81, 56, 55],
        data: assetResult,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        // type: Line,
        label: "投資額",
        data: investmentResult,
        backgroundColor: "rgb(75, 100, 192)",
      },
      {
        // type: Bar,
        label: "利益額",
        data: bottomLineResult,
        backgroundColor: "rgb(192, 100, 75)",
      },
      {
        // type: Line,
        label: "利益率",
        data: returnOnAssetsResult,
        // borderColor: "rgb(75, 192, 100)",
        backgroundColor: "rgb(75, 192, 100)",
      },
    ]
  };

  return (
    <div className={classes.div}>
      {/* <h3>グラフ表示</h3> */}
      <div>
        <Chart
          type={"bar"}
          data = {data}
          // options = {options}
          // redraw
        
        ></Chart>
      </div>
    </div>
  )

}

