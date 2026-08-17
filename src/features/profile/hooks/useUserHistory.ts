import { useQuery } from "@tanstack/react-query";
import { getUserHistory } from "../api/history";
import { profileKeys } from "../api/keys";

export function useUserHistory() {
  return useQuery({
    queryKey: profileKeys.history,
    queryFn: getUserHistory,
  });
}
