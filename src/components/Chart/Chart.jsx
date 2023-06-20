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

let options = {
  plugins: {
    title: {
      display: true,
      text: "aaa"
    },
    legend: { // 凡例の設定
      position: "bottom" // 下に配置
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: false
    },
    y: { // Y軸が複数あるのでyとy1のように軸にIDを付ける
      stacked: false,
      // max: 1000000,
      min: 0
    },
    y1: {
      stacked: false,
      position: "right",
      max: 100,
      min: 0
    }
  }
};

export function ChartDisplay(props) {
  
  let titleText = props.items.name;
  // console.log(titleText);


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
    scales: {
      x: {
        stacked: false
      },
      y: { // Y軸が複数あるのでyとy1のように軸にIDを付ける
        stacked: false,
        // max: 1000000,
        min: 0
      },
      y1: {
        stacked: false,
        position: "right",
        max: 100,
        min: 0
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
        borderWidth: 2,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "line",
        label: "投資額",
        data: investmentResult,
        backgroundColor: "rgba(139, 69, 19, 0.8)",
        borderColor: "rgba(139, 69, 19, 0.8)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "line",
        label: "利益額",
        data: bottomLineResult,
        backgroundColor: "rgba(255, 99, 71, 0.8)",
        borderColor: "rgba(255, 99, 71, 0.8)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y" // optionsで設定したIDを割り振ってY軸を設定する
      },
      {
        type: "bar",
        label: "利益率",
        data: returnOnAssetsResult,
        // borderColor: "rgb(75, 192, 100)",
        backgroundColor: "rgba(211, 211, 211, 0.8)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1" // optionsで設定したIDを割り振ってY軸を設定する
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
          options = {options}
          // redraw
        
        ></Chart>
      </div>
    </div>
  )

}

