import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import {FilterBarProps} from '../types';

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoriesLoading = false
}) => {

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCategoryChange(value === 'all' ? null : parseInt(value));
  };

  return (
    <div className="flex-1 relative w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 relative w-full">
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={selectedCategoryId || 'all'}
          onChange={handleCategoryChange}
          disabled={categoriesLoading}
          className="w-full pl-4 pr-10 py-3 border text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="all">כל הקטגוריות</option>
          {categories.map(category => (
            <option key={category.Id} value={category.Id}>
              {category.icon && `${category.icon} `}{category.Name}
            </option>
          ))}
        </select>

        {categoriesLoading && (
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      <div className="flex-1 relative w-full">
        <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          className="w-full pl-4 pr-10 py-3 border text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
        >
          <option value="name">מיין לפי שם</option>
          <option value="price-low">מחיר נמוך לגבוה</option>
          <option value="price-high">מחיר גבוה לנמוך</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
