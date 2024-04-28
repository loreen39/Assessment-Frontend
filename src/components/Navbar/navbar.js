import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css'; // Import CSS module styles

const Navbar = () => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('accessToken'); // Assuming you store the token in localStorage
    
    // Redirect the user to the login page or home page
    window.location.href = '/loginPage'; // Redirect to the login page
    
    // Optionally, you can perform additional cleanup or tasks here
    
    console.log('Logged out');
  };
  
  return (
    <nav className={styles.navbar}> {/* Apply className from CSS module */}
    <h3><span></span>ShopEase</h3>
      <ul>
        <li>
          <Link to="/" className={styles.navLink}>Dashboard</Link> {/* Apply className from CSS module */}
        </li>
        <li>
          <Link to="/records" className={styles.navLink}>Records</Link> {/* Apply className from CSS module */}
        </li>
      </ul>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button> {/* Apply className from CSS module */}
    </nav>
  );
};

export default Navbar;
