import React from 'react';
import { TEXTS_OrderSummary } from "../util/constants";

  /**
   * מרנדר הודעה כשהעגלה ריקה
   */
  const RenderEmptyCart: React.FC = () => (
    <div className="text-center py-8 text-gray-500">
      <div className="text-blue-400 text-6xl mb-4">🛒</div>
      <p className="text-lg font-semibold">{TEXTS_OrderSummary.EMPTY_CART}</p>
      <p className="text-gray-600 text-sm mt-2">{TEXTS_OrderSummary.EMPTY_CART_SUBTITLE}</p>
    </div>
  );

  export default RenderEmptyCart;
