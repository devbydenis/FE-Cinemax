import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLogin } = useAppSelector((state) => state.user.user);

  if (isLogin) {
    return children;
  }

  return <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;
