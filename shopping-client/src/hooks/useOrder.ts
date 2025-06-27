import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCustomerInfo, setOrder, setLoading, setError } from '../store/slices/orderSlice';
import { usePlaceOrderMutation } from '../services/ordersApi';
import { CartItem } from '../store/slices/cartSlice';
import { User, Order } from '../store/slices/orderSlice';

export const useOrder = () => {
  const dispatch = useDispatch();
  const { customerInfo, order, isLoading, error } = useSelector((state: RootState) => state.order);
  const [placeOrderMutation, { isLoading: isMutationLoading }] = usePlaceOrderMutation();

  const placeOrder = async (items: CartItem[]) => {
    if (!customerInfo) {
      dispatch(setError('אנא מלא את פרטי הלקוח'));
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await placeOrderMutation({ user: customerInfo, items }).unwrap();
      dispatch(setOrder(response as Order)); // ודא שהתגובה תואמת את הטיפוס Order
      dispatch(setError(null));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('שליחת ההזמנה נכשלה'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    customerInfo,
    order,
    isLoading: isLoading || isMutationLoading,
    error,
    setCustomerInfo: (info: User) => dispatch(setCustomerInfo(info)),
    placeOrder,
    isSuccess: !!order,
  };
};
