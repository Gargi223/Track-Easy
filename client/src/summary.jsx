import React, { useEffect, useState } from 'react';
import ExpenseGraph from './expenseGraph'; // Assuming you already have the ExpenseGraph component

import axios from 'axios';

const Summary = () => {
  const [expensesData, setExpensesData] = useState([]);

  // Retrieve the logged-in user ID from localStorage
  const loggedInUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/expense', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authorization
          },
          params: {
            userId: loggedInUserId, // Pass the logged-in user ID to filter data
          },
        });

        // Update expenses data
        setExpensesData(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    if (loggedInUserId && token) {
      fetchExpenses();
    }
  }, [loggedInUserId, token]); // Ensure to refetch if user ID or token changes

  return (
    <div className="exp">
      <nav className="navbar navbar-dark bg-dark nv">
        <div className="container-fluid">
          <a className="navbar-brand">Tracker</a>
          <div className="d-flex">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = "/home")}
            >
              Home
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-success" type="button" onClick={() => (window.location.href = "/task")}>
              Add a Task
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = "/expense")}
            >
              Add Expenditure
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-success" type="button" onClick={() => (window.location.href = "/summary")}>
              View Expense Summary
            </button>
          </div>
        </div>
      </nav>

      <h1>Expenses Data - Graph View</h1>
      <ExpenseGraph expensesData={expensesData} groupBy="month" width={800} height={600} />
      <ExpenseGraph expensesData={expensesData} groupBy="week" width={700} height={500} />
      <ExpenseGraph expensesData={expensesData} groupBy="day" width={700} height={500} />
    </div>
  );
};

export default Summary;
