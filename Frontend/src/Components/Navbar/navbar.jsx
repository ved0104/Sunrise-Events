import React from "react";
import { NavbarMenu } from "../../mockData/data";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa6";
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8">
          {/* Logo Section */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell />
            <p className="">Coders</p>
            <p className="text-[#fb923c]">Gym</p>
          </div>
          {/* menu Section */}
          <div className="md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {
                NavbarMenu.map((item)=>{
                  return <li key={item.id}><a href={item.link} className="inline-block py-1 px-3 hover:text-primary font-semibold">{item.title}</a></li>
                })
              }
            </ul>
          </div>
          {/* icons Section */}
          {/* Cart Section */}
          {/* Mobile Hamburger menu section */}
        </div>
      </nav>
      {/* Mobile sidebar section */}
    </>
  );
};

export default Navbar;