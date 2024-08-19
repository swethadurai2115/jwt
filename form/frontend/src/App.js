import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/login'; // Ensure 'Login' is capitalized
import Profile from './pages/profile'; // Ensure 'Profile' is capitalized

const App = () => {
  // Example condition for user authentication
  const user = Boolean(localStorage.getItem('token')); // or any other authentication check

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/profile' 
          element={user ? <Profile /> : <Login />} // Render Profile if user is authenticated, otherwise Login
        />
      </Routes>
    </Router>
  );
}

export default App;
