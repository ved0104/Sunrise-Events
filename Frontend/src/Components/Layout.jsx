import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/Footer";
import Instagram from "./homePage/Instagram";
import EndPart from "./homePage/End";

const Layout = () => {
  return (
    <div className="bg-[#fff5ed]">
    {/*<div className="bg-amber-50">
    <div className="bg-pink-50">
    <div className="bg-pink-100">
    </div><div className="bg-white"> */}
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <EndPart />
      <Instagram />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
