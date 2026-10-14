import React from 'react';
import { ShoppingBag } from 'lucide-react';

/** Clean shopping-bag mark for header branding. */
const BrandLogo: React.FC<{ className?: string }> = ({ className = 'h-10 w-10' }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm ${className}`}
    aria-hidden="true"
  >
    <ShoppingBag className="h-[55%] w-[55%]" strokeWidth={2.25} />
  </span>
);

export default BrandLogo;
