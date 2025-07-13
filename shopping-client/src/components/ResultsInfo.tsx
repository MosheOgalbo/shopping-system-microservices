import React from 'react';
import {ResultsInfoProps} from '../types';

const ResultsInfo: React.FC<ResultsInfoProps> = ({ count, searchTerm, category }) => (
  <div className="mb-6">
    <p className="text-gray-600">
      נמצאו <span className="font-semibold text-blue-600">{count}</span> מוצרים
      {searchTerm && (
        <span>
          {' '}עבור "<span className="font-medium text-gray-800">{searchTerm}</span>"
        </span>
      )}
      {category && (
        <span>
          {' '}בקטגוריה "<span className="font-medium text-gray-800">{category}</span>"
        </span>
      )}
    </p>
  </div>
);

export default ResultsInfo;
