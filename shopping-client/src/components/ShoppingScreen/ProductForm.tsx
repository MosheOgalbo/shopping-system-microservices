import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Package, Plus, Minus } from 'lucide-react';
import { addItem } from '../../store/slices/cartSlice';
import Button from '../common/Button';
import { APP_CONFIG, UI_MESSAGES } from '../../utils/constants';

const ProductForm = ({ categories }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(APP_CONFIG.MIN_QUANTITY);

  const handleAddToCart = () => {
    if (!selectedCategory || !productName.trim()) {
      alert(UI_MESSAGES.VALIDATION_ERROR);
      return;
    }

    const category = categories.find(cat => cat.id.toString() === selectedCategory);
    if (!category) {
      alert('קטגוריה לא נמצאה');
      return;
    }

    dispatch(addItem({
      categoryId: selectedCategory,
      categoryName: category.name,
      name: productName,
      quantity: quantity
    }));

    // Reset form
    setProductName('');
    setQuantity(APP_CONFIG.MIN_QUANTITY);
    setSelectedCategory('');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= APP_CONFIG.MIN_QUANTITY && newQuantity <= APP_CONFIG.MAX_QUANTITY) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary-600" />
        הוספת מוצר
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            קטגוריה *
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          >
            <option value="">בחר קטגוריה</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            שם המוצר *
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="הזן שם מוצר"
            maxLength="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            כמות
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity <= APP_CONFIG.MIN_QUANTITY}
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || APP_CONFIG.MIN_QUANTITY)}
              className="w-20 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min={APP_CONFIG.MIN_QUANTITY}
              max={APP_CONFIG.MAX_QUANTITY}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity >= APP_CONFIG.MAX_QUANTITY}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!selectedCategory || !productName.trim()}
        >
          הוסף מוצר לסל
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
