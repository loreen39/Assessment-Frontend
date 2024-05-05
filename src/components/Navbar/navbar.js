import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css'; // Import CSS module styles

const Navbar = ({totalRecords}) => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('userInfo');
    
    // Redirect the user to the login page or home page
    window.location.href = '/loginPage'; // Redirect to the login page
    
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
            {/* Pass totalRecords as a parameter in the URL */}
            <Link to="/recordsNb" state= { totalRecords }  className={styles.navLink}>Records</Link> 
        </li>
      </ul>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button> {/* Apply className from CSS module */}
    </nav>
  );
};

export default Navbar;
