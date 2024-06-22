import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const workoutData = [
  { month: "Jan", year: 2024, workouts: 10 },
  { month: "Feb", year: 2024, workouts: 15 },
  { month: "Mar", year: 2024, workouts: 8 },
  { month: "Apr", year: 2024, workouts: 20 },
  { month: "May", year: 2024, workouts: 25 },
  { month: "Jun", year: 2024, workouts: 18 },
  { month: "Jul", year: 2024, workouts: 22 },
  { month: "Aug", year: 2024, workouts: 30 },
  { month: "Sep", year: 2024, workouts: 12 },
  { month: "Oct", year: 2024, workouts: 15 },
  { month: "Nov", year: 2024, workouts: 20 },
  { month: "Dec", year: 2024, workouts: 24 },
];

const formatDataForChart = (data) => {
  const labels = data.map((item) => `${item.month} ${item.year}`);
  const values = data.map((item) => item.workouts);

  return { labels, values };
};

const chartData = formatDataForChart(workoutData);

const data = {
  labels: chartData.labels,
  datasets: [
    {
      label: "Workouts Per Month",
      data: chartData.values,
      fill: false,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "rgba(255, 0, 0, 1)",
      tension: 0.4, // Makes the line smooth
      pointBackgroundColor: "rgba(255, 0, 0, 1)",
      pointBorderColor: "rgba(255, 0, 0, 1)",
      pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
      pointHoverBorderColor: "rgba(255, 0, 0, 1)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white", // Label color
      },
    },
    title: {
      display: true,
      text: "Workouts Per Month",
      color: "white", // Title color
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white", // X-axis tick color
      },
      grid: {
        color: "rgba(191, 182, 225, 0.2)", // X-axis grid color
      },
    },
    y: {
      ticks: {
        color: "white", // Y-axis tick color
        stepSize: 10, // Step size of 10
      },
      grid: {
        color: "rgba(191, 182, 225, 0.2)", // Y-axis grid color
      },
    },
  },
};

const WorkoutsPerMonthChart = () => {
  return (
    <div className="dashboard">
      <h1 className="text-white">Workout Dashboard</h1>
      <div
        className="chart-container"
        style={{
          height: "600px",
          width: "100%",
          backgroundColor: "#000000",
          borderColor: "rgb(191, 182, 225)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WorkoutsPerMonthChart;
