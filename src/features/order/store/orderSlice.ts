import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types/order";

export interface OrderState {
  order: Order;
  orders: Order[];
}

const emptyOrder: Order = {
  orderId: "",
  userId: "",
  title: "",
  date_booking: "",
  time_booking: "",
  location: "",
  cinema: "",
  seats: [],
  totalPrice: 0,
  payment: "",
  statusPayment: false,
};

const initialState: OrderState = {
  order: emptyOrder,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderAction: (state, action: PayloadAction<Partial<Order>>) => {
      state.order = { ...state.order, ...action.payload };
    },
    addSeatsAction: (state, action: PayloadAction<string[]>) => {
      state.order.seats = action.payload;
    },
    resetOrder: (state) => {
      state.order = { ...emptyOrder };
    },
  },
});

export const { addOrderAction, addSeatsAction, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
