import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthContext } from './path/to/auth/context'; // Import your AuthContext
import LoginPage from './Routes/loginPage';
import AdminDashboard from './Routes/dashboard';
import TotalRecords from './Routes/recordsNb';

describe('App', () => {
  test('renders login page when user is not authenticated', () => {
    const mockAuthContextValue = {
      user: null,
    };

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <App />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders admin dashboard when user is authenticated', () => {
    const mockAuthContextValue = {
      user: { username: 'testuser' },
    };

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <App />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  // Add more tests as needed to cover other scenarios
});
