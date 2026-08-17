export interface Order {
  orderId: string;
  userId: string;
  title: string;
  date_booking: string;
  time_booking: string;
  location: string;
  cinema: string;
  seats: string[];
  totalPrice: number;
  payment: string;
  statusPayment: boolean;
}
