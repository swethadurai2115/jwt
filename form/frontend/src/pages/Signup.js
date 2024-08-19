import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the default form submission
    axios.post("http://localhost:3001/signup", {
      username: username,
      password: password,
    })
    .then(res => {
      alert(res.data.message); // Assuming res.data has a message property
      navigate("/login");
    })
    .catch(err => {
      console.error(err);
      alert('Signup failed. Please try again.');
    });

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <form className={styles.container} onSubmit={handleSignup}>
      <div className='m-5'>
        <label className='mr-10'>Username </label>
        <input 
          className={styles.input} 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='m-5'>
        <label className='mr-10'>Password </label>
        <input 
          className={styles.input} 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='m-5'>
        <button 
          className={styles.button} 
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
