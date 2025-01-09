import './task.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Task() {
  const loggedInUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isShifted, setIsShifted] = useState(false);

  // Fetch tasks from the server
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: loggedInUserId },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [loggedInUserId, token]);

  // Add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (task.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3001/tasks", // Updated URL
          { task},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Add the task to the UI
        setTasks([...tasks, response.data.task]);
        setTask("");
        setIsShifted(true);
      } catch (error) {
        console.error("Error adding task:", error.response?.data || error.message);
      }
    }
  };
  

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update tasks state
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="exp">
      <nav className="navbar navbar-dark bg-dark nv">
        <div className="container-fluid">
          <a className="navbar-brand">Tracker</a>
          <div className="d-flex">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = '/home')}
            >
              Home
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = '/task')}
            >
              Add a Task
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = '/expense')}
            >
              Add Expenditure
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = '/summary')}
            >
              View Expense Summary
            </button>
          </div>
        </div>
      </nav>

      <div className={`tsk ${isShifted ? 'shifted' : ''}`}>
        <h2>What do you Plan On Doing Today?</h2>
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />{' '}
        &nbsp;
        <button onClick={handleSubmit}>Add Task</button>
      </div>

      {tasks.length > 0 && (
        <table className="tstbl">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.task}</td>
                <td><input type="checkbox" /></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
