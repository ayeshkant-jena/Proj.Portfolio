import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
