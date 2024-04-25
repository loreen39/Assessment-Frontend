import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Added 'Router' alias

import AdminDashboard from "./Routes/dashboard"; // Corrected component name to start with uppercase

function App() {
  return (
    <Router> {/* Changed 'Routes' to 'Router' */}
      <Routes>
        <Route path="/" element={<AdminDashboard />} /> {/* Corrected component name to start with uppercase */}
      </Routes>
    </Router>
  );
}

export default App;
