import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
      
        if (!email || !password) {
          setError("All fields are required");
          return;
        }
      
        if (!/\S+@\S+\.\S+/.test(email)) {
          setError("Invalid email format");
          return;
        }
      
        if (password.length < 4) {
          setError("Password must be at least 4 characters long");
          return;
        }
      
        try {
          const response = await axios.post('/api/login', { email, password });
          localStorage.setItem('token', response.data.token);
          navigate('/vacations'); 
        } catch (error) {
          setError("Wrong information");
        }
      };
  
    return (
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Not registered? <Link to="/register">Click here</Link>
        </p>
      </div>
    );
  };
  
  export default LoginPage;