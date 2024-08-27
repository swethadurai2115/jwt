// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import UserDetails from './components/UserDetails'; // Import the UserDetails component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
