import React from 'react';
import { ResultsInfoProps } from '../types';

/**
 * קומפוננטה להצגת מידע על תוצאות החיפוש
 * מציגה מספר מוצרים, מונח חיפוש וקטגוריה (אם רלוונטי)
 * @param count - מספר המוצרים שנמצאו
 * @param searchTerm - מונח החיפוש (אופציונלי)
 * @param category - הקטגוריה הנבחרת (אופציונלי)
 */
const ResultsInfo: React.FC<ResultsInfoProps> = ({ count, searchTerm, category }) => {

  /**
   * פונקציה לרינדור טקסט מונח החיפוש
   * מציגה את מונח החיפוש אם הוא קיים
   */
  const renderSearchTerm = (): JSX.Element | null => {
    if (!searchTerm) return null;

    return (
      <span>
        {' '}עבור "<span className="font-medium text-gray-800">{searchTerm}</span>"
      </span>
    );
  };

  /**
   * פונקציה לרינדור טקסט הקטגוריה
   * מציגה את הקטגוריה אם היא נבחרה
   */
  const renderCategory = (): JSX.Element | null => {
    if (!category) return null;

    return (
      <span>
        {' '}בקטגוריה "<span className="font-medium text-gray-800">{category}</span>"
      </span>
    );
  };

  /**
   * פונקציה לקביעת הטקסט המתאים למספר המוצרים
   * מטפלת בצורות יחיד/רבים בעברית
   */
  const getProductsText = (): string => {
    if (count === 0) return 'לא נמצאו מוצרים';
    if (count === 1) return 'נמצא מוצר אחד';
    return `נמצאו ${count} מוצרים`;
  };

  return (
    <div className="mb-6">
      <p
        className="text-gray-600"
        role="status"
        aria-live="polite"
        aria-label={`תוצאות חיפוש: ${getProductsText()}`}
      >
        {/* מספר המוצרים שנמצאו */}
        <span className="font-semibold text-blue-600">
          {getProductsText()}
        </span>

        {/* מונח החיפוש (אם קיים) */}
        {renderSearchTerm()}

        {/* קטגוריה (אם נבחרה) */}
        {renderCategory()}
      </p>
    </div>
  );
};

export default ResultsInfo;
