import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { FilterBarProps } from '../types';

// קבועים למיון - מונעים טעויות כתיב ומקלים על תחזוקה
const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high'
} as const;

const ALL_CATEGORIES = 'all';

/**
 * רכיב FilterBar - מספק אפשרויות סינון ומיון למוצרים
 * @param categories - רשימת קטגוריות זמינות
 * @param selectedCategoryId - מזהה הקטגוריה הנבחרת
 * @param onCategoryChange - פונקציה לטיפול בשינוי קטגוריה
 * @param sortBy - סוג המיון הנוכחי
 * @param onSortChange - פונקציה לטיפול בשינוי מיון
 * @param categoriesLoading - האם הקטגוריות נטענות
 */
const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoriesLoading = false
}) => {
  /**
   * מטפל בשינוי קטגוריה - ממיר את הערך לפורמט המתאים
   */
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const categoryId = value === ALL_CATEGORIES ? null : parseInt(value);
    onCategoryChange(categoryId);
  };

  /**
   * מטפל בשינוי אופציית המיון
   */
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  // סגנונות משותפים לשדות הבחירה
  const selectStyles = `
    w-full pl-4 pr-10 py-3 border text-gray-900 border-gray-200 rounded-xl
    focus:ring-2 focus:ring-primary-500 focus:border-transparent
    transition-all duration-300 appearance-none bg-white
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // סגנונות משותפים לאייקונים
  const iconStyles = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5";

  return (
    <div className="flex-1 relative w-full flex flex-col md:flex-row items-center justify-between gap-4">
      {/* בחירת קטגוריה */}
      <div className="flex-1 relative w-full">
        <Filter className={iconStyles} />
        <select
          value={selectedCategoryId || ALL_CATEGORIES}
          onChange={handleCategoryChange}
          disabled={categoriesLoading}
          className={selectStyles}
          aria-label="בחירת קטגוריה"
        >
          <option value={ALL_CATEGORIES}>כל הקטגוריות</option>
          {categories.map(category => (
            <option key={category.Id} value={category.Id}>
              {category.icon && `${category.icon} `}{category.Name}
            </option>
          ))}
        </select>

        {/* אינדיקטור טעינה לקטגוריות */}
        {categoriesLoading && (
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
          </div>
        )}
      </div>

      {/* בחירת מיון */}
      <div className="flex-1 relative w-full">
        <SortAsc className={iconStyles} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={selectStyles}
          aria-label="בחירת סוג מיון"
        >
          <option value={SORT_OPTIONS.NAME}>מיין לפי שם</option>
          <option value={SORT_OPTIONS.PRICE_LOW}>מחיר נמוך לגבוה</option>
          <option value={SORT_OPTIONS.PRICE_HIGH}>מחיר גבוה לנמוך</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
