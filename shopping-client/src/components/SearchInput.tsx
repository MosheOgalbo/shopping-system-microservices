import React from 'react';
import { Search } from 'lucide-react';
import { SearchInputProps } from '../types';

/**
 * קומפוננטה לשדה חיפוש מוצרים
 * כוללת אייקון חיפוש ותמיכה בעברית (RTL)
 * @param value - הערך הנוכחי בשדה החיפוש
 * @param onChange - פונקציה שמתבצעת כשהערך משתנה
 */
const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {

  /**
   * פונקציה לטיפול בשינוי הערך בשדה החיפוש
   * מעבירה את הערך החדש לפונקציה החיצונית
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    onChange(newValue);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex-1 relative w-full">
      {/* אייקון חיפוש - ממוקם בצד ימין עבור RTL */}
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        aria-hidden="true"
      />

      {/* שדה הקלט הראשי */}
      <input
        type="text"
        placeholder="חפש מוצרים..."
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        dir="rtl"
        aria-label="חיפוש מוצרים"
        aria-describedby="search-help"
        autoComplete="off"
        spellCheck="false"
      />

      {/* טקסט עזרה נסתר לנגישות */}
      <div
        id="search-help"
        className="sr-only"
        aria-live="polite"
      >
        הקלד כדי לחפש מוצרים. התוצאות יופיעו בזמן אמת.
      </div>
    </div>
  );
};

export default SearchInput;
