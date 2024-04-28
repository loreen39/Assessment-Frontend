import React, { useState } from 'react';
import styles from './loginForm.module.css';
import Swal from 'sweetalert2';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Redirect or show success message
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500
      });

      // redirect the user to another page upon successful login
       window.location.href = '/';
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your username and password'
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={login}>
      <h2 className={styles.header}>Login Form</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
