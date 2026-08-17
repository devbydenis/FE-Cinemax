import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/cinemax-logo-transparent.png";
import HamburgerMenu from "./HamburgerMenu";

function NavbarAdmin() {
  return (
    <nav className="bg-white p-4 px-10 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-black">
            <img src={logo} alt="Logo" className="w-50" />
          </Link>

          <div className="hidden gap-8 md:flex">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange underline underline-offset-8"
                  : "text-black"
              }
              to={"admin/dashboard"}
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange underline underline-offset-8"
                  : "text-black"
              }
              to={"admin/list-movie"}
            >
              List Movie
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange underline underline-offset-8"
                  : "text-black"
              }
              to={"admin/add-movie"}
            >
              Add Movie
            </NavLink>
          </div>

          <div className="hidden md:block">
            <button className="rounded-xl border-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-600">
              Logout
            </button>
          </div>

          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}



export default NavbarAdmin;
