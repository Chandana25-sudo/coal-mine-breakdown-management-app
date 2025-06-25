import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <section className="analytics-section">
        <h2>Analytics Dashboard</h2>
        <div style={{ textAlign: "center", padding: "60px", color: "#6c757d" }}>
          <h3>No Data Available</h3>
          <p>Add some breakdown records to view analytics charts.</p>
        </div>
      </section>
    );
  }

  // Prepare data for charts
  const categoryData = {};
  const machineData = {};
  const shiftData = {};
  const delayData = {};
  const priorityData = {};
  const sparePartsData = {};

  data.forEach((record) => {
    // Category breakdown
    categoryData[record.category] = (categoryData[record.category] || 0) + 1;

    // Machine breakdown
    machineData[record.machine] = (machineData[record.machine] || 0) + 1;

    // Shift breakdown
    shiftData[record.shift] = (shiftData[record.shift] || 0) + 1;

    // Delay time by category
    delayData[record.category] =
      (delayData[record.category] || 0) + parseFloat(record.delayTime);

    // Priority breakdown
    priorityData[record.priority] = (priorityData[record.priority] || 0) + 1;

    // Spare parts usage
    if (record.spareParts && record.spareParts.trim()) {
      const parts = record.spareParts
        .split(/[,;|\n]/)
        .map((part) => part.trim())
        .filter((part) => part);
      parts.forEach((part) => {
        sparePartsData[part] = (sparePartsData[part] || 0) + 1;
      });
    }
  });

  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF",
  ];

  const createPieChartData = (data, colors = chartColors) => ({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
  };

  const delayChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toFixed(
              1
            )} hrs (${percentage}%)`;
          },
        },
      },
    },
  };

  // Get top 10 spare parts
  const sortedParts = Object.entries(sparePartsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const sparePartsChartData = {
    labels: sortedParts.map(([part]) => part),
    datasets: [
      {
        label: "Usage Count",
        data: sortedParts.map(([, count]) => count),
        backgroundColor: "#667eea",
        borderColor: "#5a67d8",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <section className="analytics-section">
      <h2>Analytics Dashboard</h2>
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Breakdown by Category</h3>
          <div className="chart-wrapper">
            <Pie
              data={createPieChartData(categoryData)}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-container">
          <h3>Breakdown by Machine</h3>
          <div className="chart-wrapper">
            <Pie
              data={createPieChartData(machineData, [
                "#36A2EB",
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#C9CBCF",
              ])}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-container">
          <h3>Breakdown by Shift</h3>
          <div className="chart-wrapper">
            <Pie
              data={createPieChartData(shiftData, [
                "#FFCE56",
                "#FF6384",
                "#36A2EB",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#C9CBCF",
                "#8BC34A",
              ])}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-container">
          <h3>Delay Time by Category</h3>
          <div className="chart-wrapper">
            <Pie
              data={createPieChartData(delayData, [
                "#4BC0C0",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#C9CBCF",
              ])}
              options={delayChartOptions}
            />
          </div>
        </div>

        <div className="chart-container">
          <h3>Maintenance Priority</h3>
          <div className="chart-wrapper">
            <Pie
              data={createPieChartData(priorityData, [
                "#FF6384",
                "#FFCE56",
                "#36A2EB",
              ])}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-container">
          <h3>Spare Parts Usage</h3>
          <div className="chart-wrapper">
            {sortedParts.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#6c757d",
                  fontSize: "16px",
                }}
              >
                No spare parts data available
              </div>
            ) : (
              <Bar data={sparePartsChartData} options={barChartOptions} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
