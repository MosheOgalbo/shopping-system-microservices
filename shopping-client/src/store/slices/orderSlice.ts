import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order ,OrderState} from '../types';

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<Order>) {
      state.currentOrder = action.payload;
    },
    addToOrderHistory(state, action: PayloadAction<Order>) {
      state.orderHistory.unshift(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    updateOrderStatus(state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) {
      const { orderId, status } = action.payload;
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.status = status;
      }
      const orderInHistory = state.orderHistory.find(order => order.id === orderId);
      if (orderInHistory) {
        orderInHistory.status = status;
      }
    }
  },
});

export const {
  setCurrentOrder,
  addToOrderHistory,
  setLoading,
  setError,
  clearCurrentOrder,
  updateOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;
