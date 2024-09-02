const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'jkrodbrntnjnesdrfrfdxws.rtytg';

app.use(bodyParser.json());
app.use(cors());

let users = [{ username: 'user1', password: 'password1' }];
let sales = [{ id: 1, item: 'Item 1', amount: 100 }];
let products = [{ id: 1, name: 'Product 1', price: 50 }];

// Register route
app.post('/api/auth/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        req.username = decoded.username;
        next();
    });
};

// Protected routes
app.get('/api/sales', verifyToken, (req, res) => {
    res.json(sales);
});

app.get('/api/products', verifyToken, (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
