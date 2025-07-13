import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {SuccessModalProps} from '../types/index'


const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Auto close after 3 seconds and navigate to shopping
      const timer = setTimeout(() => {
        onClose();
        navigate('/shopping');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    navigate('/shopping');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-slideInFromRight">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <div className="text-3xl text-green-600 success-checkmark">✓</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ההזמנה נשלחה בהצלחה! 🎉
          </h2>
          <p className="text-gray-600">
            תודה רבה על ההזמנה שלך
          </p>
        </div>

        {/* Order Details */}
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">מספר הזמנה:</p>
            <p className="font-mono text-lg font-semibold text-blue-600">
              {orderId}
            </p>
          </div>
        )}

        {/* Success Message */}
        <div className="text-center mb-6">
          <p className="text-gray-700 leading-relaxed">
            ההזמנה שלך התקבלה בהצלחה ותעובד בהקדם האפשרי.
            <br />
            תקבל עדכון במייל על סטטוס ההזמנה.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleContinueShopping}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            המשך קניות 🛒
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              החלון יסגר אוטומטית בעוד 3 שניות...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
