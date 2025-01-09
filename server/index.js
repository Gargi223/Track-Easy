const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ETuserModel = require('./models/ET-users');
const Expense = require("./models/expenseData.js");
const jwt = require('jsonwebtoken');
const Task=require("./models/Todo-list.js")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ET-users");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user; // Attach user to the request
    next();
  });
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  ETuserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          // Generate JWT Token
          const token = jwt.sign(
            { id: user._id }, // Add user info to the payload (e.g., user ID)
            "your_secret_key", // Secret key
            { expiresIn: "1h" } // Expiration time (optional)
          );
          res.json({ message: "success", token, userId: user._id }); // Send token and userId in response
        } else {
          res.status(401).json("Password is incorrect");
        }
      } else {
        res.status(404).json("No record found");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/register', (req, res) => {
  ETuserModel.create(req.body)
    .then(ETusers => res.json(ETusers))
    .catch(err => res.json(err));
});

app.post("/expense", authenticate, (req, res) => {
  const { date, title, merchant, amount, report, status } = req.body;
  const userId = req.user.id; // Get userId from the authenticated user (from the token)

  const newExpense = new Expense({
    date,
    title,
    merchant,
    amount,
    report,
    status,
    userId, // Use the authenticated user ID here
  });

  newExpense
    .save()
    .then((expense) => 
      res.status(201).json({ message: "Expense added successfully", newExpense: expense })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Fetch Expenses Route - Get all expenses
app.get("/expense", authenticate, (req, res) => {
  const userId = req.query.userId; 
  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }
  Expense.find({ userId })
    .then((expenses) => res.status(200).json(expenses))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/task", authenticate, (req, res) => {
  const userId = req.query.userId; // User ID from query params

  if (String(req.user.id) !== String(userId)) {
    return res.status(403).json({ error: "Forbidden: User ID mismatch" });
  }

  Task.find({ userId })
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(500).json({ error: err.message }));
});




app.post("/task", authenticate, (req, res) => {
  const { task } = req.body;
  const userId = req.user.id; // User ID from the authenticated user

  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task content is required" });
  }

  const newTask = new Task({
    task,
    userId, // Attach the authenticated user ID
  });

  newTask
    .save()
    .then((savedTask) =>
      res.status(201).json({ message: "Task added successfully", task: savedTask })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});




app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
