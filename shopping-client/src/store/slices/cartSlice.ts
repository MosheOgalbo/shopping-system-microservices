import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
  }>;
}

interface OrderState {
  customerInfo: Order['user'] | null;
  order: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  customerInfo: null,
  order: null,
  isLoading: false,
  error: null,
};

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCustomerInfo(state, action: PayloadAction<Order['user']>) {
      state.customerInfo = action.payload;
    },
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCustomerInfo, setOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
