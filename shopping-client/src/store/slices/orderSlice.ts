import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define and export the Order type or interface
export interface Order {
  id: string;
  // Add other properties as needed, e.g., name, price, etc.
}
export interface User {
  id: string;
  name: string;
  email: string;
  // Add other properties as needed
}

// Define the state type
const initialState: OrderState = {
  customerInfo: null,
  order: null,
  isLoading: false,
  error: null,
};

interface OrderState {
  customerInfo: any; // Replace with a specific type if known
  order: Order | null;
  isLoading: boolean;
  error: any; // Add this line
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCustomerInfo: (state, action: PayloadAction<any>) => {
      state.customerInfo = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
     setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

// Export the action creators as named exports
export const { setCustomerInfo, setOrder, setLoading ,setError} = orderSlice.actions;

// Export the reducer as the default export
export default orderSlice.reducer;
