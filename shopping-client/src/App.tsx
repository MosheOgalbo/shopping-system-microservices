import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShoppingScreen from './components/ShoppingScreen/ShoppingScreen';
import OrderScreen from './components/OrderScreen/OrderScreen';
import Header from './common/Header';
import './App.css';

const App: React.FC = () => {
  const order = { id: 'some-order-id' }; // Replace with actual order data

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<ShoppingScreen />} />
          <Route path="/order" element={<OrderScreen order={order} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
