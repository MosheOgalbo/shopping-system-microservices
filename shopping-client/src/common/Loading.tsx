import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'טוען...', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Loader2 className={`${sizes[size]} text-primary-600 animate-spin mb-4`} />
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default Loading;
