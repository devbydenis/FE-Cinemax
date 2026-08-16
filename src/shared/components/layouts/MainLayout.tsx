import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
