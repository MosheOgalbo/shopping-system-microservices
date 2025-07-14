import React from 'react'
import {TEXTS_OrderSummary} from '../util/constants';
import { CartItem } from '../types/index';

interface RenderOrderItemProps {
  item: CartItem;
}

/**
   * מרנדר מוצר בודד ברשימת ההזמנה

*/
const RenderOrderItem: React.FC<RenderOrderItemProps> = ({ item }) => {
     /**
   * בודק אם הנתיב הוא URL תקין לתמונה
   */
     const isImageUrl = (image: string | undefined): boolean => {
    return image?.startsWith('http') || image?.startsWith('data:') || false;
  };

  return (
    <div
      key={item.id}
      className="flex justify-between items-center py-3 border-b last:border-b-0"
    >
      <div className="flex items-center">
        {/* תמונה או אייקון של המוצר */}
        {isImageUrl(item.image) ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-md ml-3"
          />
        ) : (
          <span className="text-2xl ml-3">
            {item.image || TEXTS_OrderSummary.DEFAULT_PRODUCT_ICON}
          </span>
        )}

        {/* פרטי המוצר */}
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm">
            ₪{item.price.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>

      {/* מחיר כולל לפריט */}
      <span className="font-bold text-red-400">
        ₪{(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
}

export default RenderOrderItem;
