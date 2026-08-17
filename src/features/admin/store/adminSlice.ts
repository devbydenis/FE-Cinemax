import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AdminMovie {
  title: string;
  category: string;
  releaseDate: string;
  durationHour: number;
  durationMinute: number;
  directorName: string;
  genres: string;
  cast: string;
  synopsis: string;
}

export interface AdminState {
  movies: AdminMovie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  movies: [],
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<AdminMovie>) => {
      state.movies = [...state.movies, action.payload];
    },
  },
});

export const { addMovie } = adminSlice.actions;
export default adminSlice.reducer;
