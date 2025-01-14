import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        style={{ display: 'block', margin: '10px auto', padding: '10px' }}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{ display: 'block', margin: '10px auto', padding: '10px' }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={{ display: 'block', margin: '10px auto', padding: '10px' }}
                />
                <button
                    type="submit"
                    style={{
                        background: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <p style={{ marginTop: '20px', cursor: 'pointer', color: '#007bff' }}>
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
        </div>
    );
};

export default Login;
