import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
