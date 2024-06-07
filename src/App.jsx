import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Resource from './components/Resources/Resource';
import Setting from './components/Settings/Setting';
import DashboardComp from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import ForgotPassword from './components/Home/ForgotPassword';
import CheckOutWrapper from './components/CheckOutWrapper/CheckOutWrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardComp />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/checkOut" element={<CheckOutWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
