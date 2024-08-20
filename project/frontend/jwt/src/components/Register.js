import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            register(formData.username, formData.email, formData.password)
                .then(() => {
                    setMessage('Registration successful');
                    navigate('/login'); // Navigate to login page on success
                })
                .catch(err => {
                    setMessage(err.response ? err.response.data.message : 'Error registering');
                });
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange} 
                />
                {errors.username && <p>{errors.username}</p>}
                
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange} 
                />
                {errors.email && <p>{errors.email}</p>}
                
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange} 
                />
                {errors.password && <p>{errors.password}</p>}
                
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
