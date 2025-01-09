// ExpenseGraph.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Group expenses data by day, week, or month
function groupExpensesBy(expenses, period) {
  const groupedData = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    let key;

    if (period === 'day') {
      key = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    } else if (period === 'week') {
      const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`; // 'YYYY-Wx'
      key = week;
    } else if (period === 'month') {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`; // 'YYYY-MM'
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }

    groupedData[key] += parseFloat(expense.amount);
  });

  return groupedData;
}

const ExpenseGraph = ({ expensesData, groupBy = 'month'  }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const groupedData = groupExpensesBy(expensesData, groupBy);
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Expenses by ${groupBy}`,
          data: values,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    });
  }, [expensesData, groupBy]);

  return (
    <div>
      <h2>Expenses Graph</h2>
      {chartData && chartData.labels ? (
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <p>No data to display</p>

      )}
       
    </div>
  );
};

export default ExpenseGraph;
