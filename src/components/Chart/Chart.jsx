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

  
  let titleText = props.items.name;
  // console.log(titleText);


  let labels = [];
  labels.push(...props.table.map(
    // item => item["year"] + "年目"
    item => item["year"]
  ));

  // 資産額
  let assetResult = [];
  assetResult.push(...props.table.map(
    item => Math.round(item["finalAssetResult"])
  ));
  // console.log(assetResult);

  // 投資額
  let investmentResult = [];
  investmentResult.push(...props.table.map(
    item => Math.round(item["totalInvestmentResult"])
    // item => item["totalInvestmentResult"]
  ));
  // console.log(investmentResult);

  // 利益額
  let bottomLineResult = [];
  bottomLineResult.push(...props.table.map(
    item => Math.round(item["bottomLine"])
  ));

  // 利益率
  let returnOnAssetsResult = [];
  returnOnAssetsResult.push(...props.table.map(
    item => Math.round(item["returnOnAssets"]*10)/10
  ));

  let options = {
    plugins: {
      title: {
        display: true,
        text: titleText
      },
      legend: { // 凡例の設定
        position: "bottom" // 下に配置
      }
    },
    responsive: true,
    // aspectRatio: 1.25, // 横幅を縦幅の1.25倍にする
    maintainAspectRatio: false,
    scales: {
      x: {
        // min: 0,
        display: true,
        title: {
          display: true,
          text: "経過年数",
          font: {
            size: 14,
          }
        }
      },
      y: { // Y軸が複数あるのでyとy1のように軸にIDを付ける
        // stacked: false,
        // max: 1000000,
        min: 0,
        ticks: {
          count: 6
        },
        display: true,
        title: {
          display: true,
          text: "金額(円)",
          color: "rgba(255, 0, 0, 0.8)",
          font: {
            size: 14,
          }
        }
        
      },
      y1: {
        // stacked: false,
        position: "right",
        max: 100,
        min: 0,
        ticks: {
          count: 6
        },
        display: true,
        title: {
          display: true,
          text: "割合(%)",
          color: "rgba(192, 192, 192, 0.8)",
          font: {
            size: 14,
          }
        }
      }
    }
  };
  
  const data = {
    labels : labels,
    datasets: [
      {
        type: "line",
        label: "資産額",
        data: assetResult,
        backgroundColor: "rgba(70, 130, 180, 0.8)",
        borderColor: "rgba(70, 130, 180, 0.8)",
        borderWidth: 4,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "line",
        label: "投資額",
        data: investmentResult,
        backgroundColor: "rgba(139, 69, 19, 0.8)",
        borderColor: "rgba(139, 69, 19, 0.8)",
        borderWidth: 4,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "line",
        label: "利益額",
        data: bottomLineResult,
        backgroundColor: "rgba(255, 99, 71, 0.8)",
        borderColor: "rgba(255, 99, 71, 0.8)",
        borderWidth: 4,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "bar",
        label: "利益率",
        data: returnOnAssetsResult,
        // borderColor: "rgb(75, 192, 100)",
        backgroundColor: "rgba(192, 192, 192, 0.8)",
        borderWidth: 0,
        fill: false,
        yAxisID: "y1" // optionsで設定したIDを割り振ってY軸を設定する
      },
    ]
  };

  return (
    // <div>
      <div className={classes.div}>
        <Chart
          type={"bar"}
          data = {data}
          options = {options}
          height={400}
          // redraw
        
        ></Chart>
      </div>
    // </div>
  )

}

