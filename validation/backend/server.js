// Import required modules
const express = require('express');
const Joi = require('joi');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'mydatabase',
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

// Define validation schema using Joi
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Route to handle user registration
app.post('/register', (req, res) => {
  // Validate request data
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }

  const { username, email, password } = req.body;

  // Insert user data into the database
  connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ errors: ['Database error'] });
      }
      res.status(200).json({ message: 'Registration successful' });
    }
  );
});
// Handle GET request to fetch all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ errors: ['Database error'] });
    }
    res.status(200).json(results);
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
