import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShoppingScreen from './pages/ShoppingScreen';
import OrderScreen from './pages/OrderScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/shopping" />} />
        <Route path="/shopping" element={<ShoppingScreen />} />
        <Route path="/order" element={<OrderScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
