import React from "react";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Result.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const { score, total } = location.state;
  const percentage = (score / total) * 100;

  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverBackgroundColor: ["#218838", "#c82333"],
      },
    ],
  };

  return (
    <div className="result-container">
      <header className="result-header">
        <h2>Exam Results</h2>
      </header>

      <div className="result-body">
        <div className="pie-chart-container">
          <Pie data={data} options={{ responsive: true }} />
        </div>
        <div className="score-summary">
          <h3>Score Summary</h3>
          <p>
            You answered <strong>{score}</strong> out of{" "}
            <strong>{total}</strong> questions correctly.
          </p>
          <p>
            Your total score is <strong>{percentage.toFixed(2)}%</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
