import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./Routes/dashboard";
import LoginPage from "./Routes/loginPage";
import TotalRecords from "./Routes/recordsNb";

function App() {
  const {user} = useAuthContext();
  console.log("App User:", user); // Add this line for debugging
  
  return (
    <Router> 
      <Routes>
      <Route path="/loginPage" element={<LoginPage/>} />
        {/* Use PrivateRoute for the routes that should be protected */}
        <Route path="/*"  element={user ? <AdminDashboard/> : <Navigate to="/loginPage" />} />
        <Route path="/recordsNb/*" element={user ? <TotalRecords /> : <Navigate to = "/loginPage" />} />
      </Routes>
    </Router>
  );
}

export default App;
