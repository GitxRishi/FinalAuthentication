import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import './App.css';
import Home from './Components/Home'; 
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { AuthProvider } from './Context/Authcontext';
import { VisibilityProvider } from './Context/Context';


const App = () => {
  
  return (
    <div>
      <Router>
        <Routes>
       
          <Route path="/" element={<Login />} />  
          
          <Route path="/signup" element={<SignUp />} />
 
          <Route path="/login" element={<Login />} />
     
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <VisibilityProvider>
        <App />
      </VisibilityProvider>
    </AuthProvider>
  );
};

export default AppWrapper;