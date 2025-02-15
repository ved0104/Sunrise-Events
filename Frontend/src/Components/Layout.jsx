import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/Footer";
import Instagram from "./homePage/Instagram";
import EndPart from "./homePage/End";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will change dynamically with the routed pages */}
      </main>
      <EndPart/>
      <Instagram/>
      <Footer />
    </>
  );
};

export default Layout;
