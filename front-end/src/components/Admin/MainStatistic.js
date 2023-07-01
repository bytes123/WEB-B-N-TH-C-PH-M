import React, { useState } from "react";
import { Select, Space } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  registerables,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import useAdminStatistic from "../../utils/hooks/Admin/useAdminStatistic";
import Chart from "chart.js/auto";
ChartJS.register(...registerables);

export default function MainStatistic() {
  const {
    isLoading,
    onChangeYear,
    yearList,
    monthList,
    revenueByDuation,
    revenueByMonth,
    topProductsByYear,
  } = useAdminStatistic();
  const handleChange = (value) => {
    onChangeYear(value);
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo quý",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo tháng",
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 sản phẩm bán chạy",
      },
    },
  };

  const barLabels = ["Quý I", "Quý II", "Quý III", "Quý IV"];
  const lineLabels = monthList;
  const doughnutLabels = topProductsByYear.map((item) => item.name);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenueByDuation,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        fill: true,
        label: "Doanh thu",
        data: revenueByMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        label: "Số lượng bán ra",
        data: topProductsByYear.map((item) => item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" px-20 mb-5">
      <Select
        defaultValue={yearList[0].value}
        style={{ width: 120 }}
        onChange={handleChange}
        options={yearList}
      />

      <div>
        <div className="grid grid-cols-2 gap-5 ">
          <div className="bg-white my-5 border-1 rounded-lg px-2">
            <Bar options={barOptions} data={barData} />
          </div>
          <div className="bg-white my-5 border-1 rounded-lg px-2">
            {" "}
            <Doughnut
              className="max-h-[400px]"
              options={doughnutOptions}
              data={doughnutData}
            />
          </div>
        </div>
        <div>
          <div className="bg-white my-5 border-1 rounded-lg px-2">
            <Line
              className="max-h-[400px]"
              options={lineOptions}
              data={lineData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
