import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !password) {
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
      await axios.post('/api/register', { first_name: firstName, last_name: lastName, email, password });
      navigate('/vacations');
    } catch (error) {
      if (error.response.status === 409) {
        setError("Email is already registered");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already a member? <Link to="/">Click here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;