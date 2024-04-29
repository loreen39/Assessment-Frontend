import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const TotalRecordsPage = () => {
    const location = useLocation();
    const totalRecords = location.state;

  return (
    <div>
      <h2>Total Records: {totalRecords} </h2>
    </div>
  );
};

export default TotalRecordsPage;
