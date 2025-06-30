import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="flex-1 relative w-full">
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="חפש מוצרים..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
    />
  </div>
);

export default SearchInput;
