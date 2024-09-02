import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [token, setToken] = React.useState('');

    return (
        <Router> 
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sales" element={<Sales token={token} />} />
                <Route path="/products" element={<Products token={token} />} />
            </Routes>
        </Router>
    );
}

export default App;
