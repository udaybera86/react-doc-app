import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './account-authentication/login';
import Register from './account-authentication/register';
import Dashboard from './account-authentication/Dashboard';
import { IoClose } from "react-icons/io5";

function Sidebar({ isOpen, onClose, user }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSuccessfulSignup = () => {
    setShowLogin(true);
  };

  return (
    <div className={`sidebar fixed z-[3] top-0 right-0 overflow-y-auto w-1/4 h-full bg-[#18181B] rounded-tl-[30px] rounded-bl-[30px] border-l-[7px] border-[#C6C1C142] p-[34px] pt-[86px] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={onClose} className="fixed top-5 right-5 text-white">
        <IoClose size={24} color="white" />
      </button>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/dashboard" replace /> : 
            (showLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} onSuccessfulSignup={handleSuccessfulSignup} />)
        } />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default Sidebar;