const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
const JWT_SECRET = 'ac6bc157279c13e7a42768a74a6c319cab8695d755158fbab5c81bdeb79cec5516272dda7533d1eb20c74158ac8781f5879c87e2c231b451db89bffc94e049e4';

app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "$2a$10$wXWl8keGJZDuvj5B8b7dbOeXk50/MLV7QD/fY40.3wvzZr827oODy" 
  }
];

// Authenticate user and generate token
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error('Error comparing passwords:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
