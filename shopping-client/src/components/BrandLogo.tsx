import React from 'react';

/** Shopping-bag mark used in header and as the brand icon. */
const BrandLogo: React.FC<{ className?: string }> = ({ className = 'h-10 w-10' }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="14" fill="#047857" />
    <path
      d="M18 20h6.2l1.1 5.2h22.2c1.1 0 1.9 1.1 1.6 2.1l-3.2 10.1a2 2 0 0 1-1.9 1.4H27.1a2 2 0 0 1-2-1.6L22.2 20.8A1.5 1.5 0 0 0 20.7 20H18a1.5 1.5 0 1 1 0-3h3.2a3 3 0 0 1 2.9 2.4L24.4 23h19.1l-.7 2.2H26.1l1.4 7.2h14.8l1.9-6H27.2l-.6-2.8h20.4c2.2 0 3.9 2.1 3.3 4.2l-3.2 10.1A5 5 0 0 1 42.4 41H27.1a5 5 0 0 1-4.9-4L20.3 25H18a1.5 1.5 0 1 1 0-3z"
      fill="#ECFDF5"
    />
    <circle cx="29" cy="47" r="3.2" fill="#A7F3D0" />
    <circle cx="40.5" cy="47" r="3.2" fill="#A7F3D0" />
    <path
      d="M38 14c2.8 1.4 4.4 3.8 4.6 6.4-2.6-.4-5-1.9-6.4-4.4 1.2-.8 2-.8 1.8-2z"
      fill="#6EE7B7"
    />
  </svg>
);

export default BrandLogo;
