import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { FilterBarProps } from '../types';

const FilterBar: React.FC<FilterBarProps> = ({ categories, selected, onCategoryChange, sortBy, onSortChange }) => (
  <div className="flex-1 relative w-full flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex-1 relative w-full">
      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <select
        value={selected}
        onChange={e => onCategoryChange(e.target.value)}
        className="w-full pl-4 pr-10 py-3 border text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
      >
        {categories.map(cat => (
          <option key={cat} value={cat === 'כל הקטגוריות' ? '' : cat}>{cat}</option>
        ))}
      </select>
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

export default FilterBar;
