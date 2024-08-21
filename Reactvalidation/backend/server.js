// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Insert data into MySQL database
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'User registered successfully', userId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
