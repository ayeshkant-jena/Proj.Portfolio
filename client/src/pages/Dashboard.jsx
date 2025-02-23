import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [sections, setSections] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // const userId = 'YOUR_USER_ID'; // Replace with actual user ID or get it from auth context
    const location = useLocation();
    const { username } = location.state || {};

    useEffect(() => {
        // Fetch existing portfolio
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`);
                setSections(response.data.sections || []);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio();
    }, []);

    const handleAddSection = () => {
        setSections([...sections, { title, content }]);
        setTitle('');
        setContent('');
    };

    const handleSavePortfolio = async () => {
        try {
            await axios.post('http://localhost:5000/api/portfolio', { userId, sections });
            alert('Portfolio saved successfully!');
        } catch (error) {
            console.error('Error saving portfolio:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Portfolio Dashboard</h1>
            <h1>Welcome, {username}!</h1>
            <div>
                <input
                    type="text"
                    placeholder="Section Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Section Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button onClick={handleAddSection}>Add Section</button>
            </div>
            <div>
                <h2>Your Sections</h2>
                {sections.map((section, index) => (
                    <div key={index}>
                        <h3>{section.title}</h3>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSavePortfolio}>Save Portfolio</button>
        </div>
    );
};

export default Dashboard;
