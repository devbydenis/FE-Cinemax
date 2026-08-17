import type { UseFormRegisterReturn } from "react-hook-form";

export interface FormAddMovie {
  title: string;
  category: string;
  releaseDate: string;
  date: string;
  time_start: string;
  time_end: string;
  time: string;
  durationHour: number;
  durationMinute: number;
  directorName: string;
  genres: string;
  cast: string;
  synopsis: string;
}

export type InputFieldAdminProps = {
  label: string;
  name: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn;
  customStyle?: string;
};