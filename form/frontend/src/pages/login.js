import React, { useState, useContext } from 'react'; // Import useState and useContext
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => { 
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => { // Function name should be handleLogin
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            });

            dispatch({
                type: "LOGIN",
                payload: response.data.token
            });
            localStorage.setItem('token', response.data.token);
            navigate("/profile");
        } catch (error) {
            console.error("Login failed:", error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className='container w-4/5 mx-auto border border-black flex justify-center items-center flex-col'>
            <div className='m-5'>
                <label className='mr-10'>Username </label>
                <input 
                    className='border border-b-black p-1' 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='m-5'>
                <label className='mr-10'>Password </label>
                <input 
                    className='border border-b-black p-1' 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='m-5'>
                <button 
                    className='border border-black p-1 bg-transparent' 
                    onClick={handleLogin} 
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
