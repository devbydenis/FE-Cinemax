import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransaction,
  });
}
