import React, { useEffect } from 'react';
import ProductForm from './ProductForm';
import CartList from './CartList';
import { useCategories } from '../../hooks/useCategories';
import { Link } from 'react-router-dom';

const ShoppingScreen: React.FC = () => {
  const { categories, fetchCategories, isLoading } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProductForm categories={categories} />
          <CartList />
          <Link to="/order">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ShoppingScreen;
