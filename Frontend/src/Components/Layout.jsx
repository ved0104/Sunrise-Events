import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will change dynamically with the routed pages */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
