import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Added 'Router' alias

import AdminDashboard from "./Routes/dashboard";
import LoginPage from "./Routes/loginPage";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/loginPage" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
