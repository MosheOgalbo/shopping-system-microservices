import React from 'react';
import {ResultsInfoProps} from '../types';

const ResultsInfo: React.FC<ResultsInfoProps> = ({ count, searchTerm, category }) => (
  <div className="mb-6">
    <p className="text-gray-600">
      נמצאו {count} מוצרים
      {searchTerm && ` עבור "${searchTerm}"`}
      {category && category !== 'כל הקטגוריות' && ` בקטגוריה "${category}"`}
    </p>
  </div>
);

export default ResultsInfo;
