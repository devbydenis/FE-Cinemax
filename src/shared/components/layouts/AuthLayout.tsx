import { Outlet } from "react-router-dom";
import backgroundAuth from "@/assets/background_auth.png";

function AuthLayout() {
  return (
    <main
      className={`relative flex h-full items-center justify-center bg-cover bg-center py-5`}
      style={{ backgroundImage: "url(" + backgroundAuth + ")" }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
