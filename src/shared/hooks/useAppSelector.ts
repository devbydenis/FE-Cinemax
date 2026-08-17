import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function useAppSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
