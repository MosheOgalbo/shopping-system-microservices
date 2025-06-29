import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ShoppingScreen from './pages/ShoppingScreen';
import OrderScreen from './pages/OrderScreen';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
         <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Navigate to="/shopping" />} />
            <Route path="/shopping" element={<ShoppingScreen />} />
            <Route path="/order" element={<OrderScreen />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
