import { Outlet } from "react-router-dom";
import NavbarAdmin from "@/features/admin/components/NavbarAdmin";

function AdminLayout() {
  return (
    <section className="bg-orange-100 min-h-screen overflow-x-scroll">
      <NavbarAdmin />
      <Outlet />
    </section>
  );
}

export default AdminLayout;
