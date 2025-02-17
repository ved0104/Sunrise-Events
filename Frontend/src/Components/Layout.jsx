import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/Footer";
import Instagram from "./homePage/Instagram";
import EndPart from "./homePage/End";

const Layout = () => {
  return (
    <div className="bg-[#FFF5ED]">
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
