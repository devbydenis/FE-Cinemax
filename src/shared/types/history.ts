export type HistoryStatus = "success" | "pending" | "failed";

export interface History {
  id?: string;
  cinema: string;
  movie_name: string;
  date_booking: string;
  time_booking: string;
  seats: string[];
  total_price: number;
  status: HistoryStatus;
}
