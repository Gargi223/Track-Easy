import React, { useState, useEffect } from "react";
import "./expense.css";
import axios from "axios";

function Expense() {
  
  const loggedInUserId = localStorage.getItem("userId"); 

  
  const getCurrentDateDetails = () => {
    const date = new Date();
    const day = date.toLocaleString("default", { weekday: "long" }); 
    const month = date.toLocaleString("default", { month: "long" }); 
    const year = date.getFullYear();
    return `${day}_${month}_${year}`; 
  };

  const [expensesData, setExpensesData] = useState([]); 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    merchant: "",
    amount: "",
    report: getCurrentDateDetails(),
    status: "Paid",
  });

  
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        window.location.href = "/login"; 
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:3001/expense`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: loggedInUserId },
        });
        console.log("Fetched data:", response.data);
        setExpensesData(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error.response?.data || error.message);
        setExpensesData([]); 
      }
    };
  
    fetchExpenses();
  }, [loggedInUserId]);
   
  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new expense on form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/expense",
        { ...formData, userId: loggedInUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("Added expense:", response.data);
      setExpensesData([...expensesData, response.data.newExpense]);
      
      // Reset form data and hide the form
      setFormData({
        date: "",
        title: "",
        merchant: "",
        amount: "",
        report: getCurrentDateDetails(),
        status: "Paid",
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding expense:", error.response?.data || error.message);
    }
  };

  // Handle checkbox toggle
  const handleCheckedBox = (index) => {
    setExpensesData((prevExpenses) =>
      prevExpenses.map((expense, i) =>
        i === index
          ? { ...expense, status: expense.status === "Paid" ? "Yet to pay" : "Paid" }
          : expense
      )
    );
  };

  return (
    <div className="exp">
      {/* Navbar */}
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

      {/* Header Section */}
      <div className="expenses-container">
        <div className="header">
          <h1>Expenses</h1>
          <button className="new-expense" onClick={() => setIsFormVisible(!isFormVisible)}>
            + New expense
          </button>
        </div>

        {/* Form for Adding New Expense */}
        {isFormVisible && (
          <form className="expense-form" onSubmit={handleFormSubmit}>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Merchant:</label>
              <input
                type="text"
                name="merchant"
                value={formData.merchant}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
               <label>Status:</label>
               <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
              <option value="Paid">Paid</option>
              <option value="Yet to Pay">Yet to Pay</option>
             </select>
           </div>


            <button type="submit" className="btn btn-success">
              Add Expense
            </button>
          </form>
        )}

        {/* Table of Expenses */}
        <table>
          <thead>
            <tr>
              <th>DETAILS</th>
              <th>MERCHANT</th>
              <th>AMOUNT</th>
              <th>REPORT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense, index) => (
              <tr key={index} className="expense-row">
                <td>
                  <div className="details">
                    <input type="checkbox" checked ={expense.status==="paid" }  onChange={()=>handleCheckedBox(index)}/>
                    <div className="expense-info">
                      <p className="date">{expense.date}</p>
                      <p className="title">{expense.title}</p>
                    </div>
                  </div>
                </td>
                <td>{expense.merchant}</td>
                <td>Rs{expense.amount}</td>
                <td>{expense.report}</td>
                <td>
                  <span
                    className={
                      expense.status === "Paid"
                        ? "status Paid"
                        : "status Yet-to-pay"
                    }
                  >
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expense;
