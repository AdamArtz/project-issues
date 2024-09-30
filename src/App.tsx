import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VacationList from './pages/VacationList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/vacations" element={<VacationList />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;
