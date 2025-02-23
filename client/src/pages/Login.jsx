import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'

const Login = () => {
    const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                // Register new user
                await axios.post('http://localhost:5000/api/auth/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                alert('Registration successful. Please log in.');
                setIsRegister(false); // Switch to login form after registration
            } else {
                // Login existing user
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });
                // Assuming the backend returns a JWT token
                const { token, userId, username } = response.data;

                // Store token in localStorage
                localStorage.setItem('token', token);

                // Redirect to Dashboard
                navigate(`/dashboard`, { state: { userId, username } });
            }
        } catch (error) {
            console.error(error.response.data);
            alert('Error: ' + (error.response?.data?.error || 'Something went wrong'));
        }
    };

    return (
        <div className='logindiv'>
            <form onSubmit={handleSubmit}>
            <h1 className='register'>{isRegister ? 'Register' : 'Login'}</h1>
                {isRegister && (
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required
                    />
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required
                />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required
                />
                <button type="submit">
                    {isRegister ? 'Register' : 'Login'}
                </button>
            <p>
                {isRegister ? (
                    <>
                        Already have an account?{' '}
                        <span onClick={() => setIsRegister(false)}>Login</span>
                    </>
                ) : (
                    <>
                        Don't have an account?{' '}
                        <span onClick={() => setIsRegister(true)}>Register</span>
                    </>
                )}
            </p>
            </form>
        </div>
    );
};

export default Login;
