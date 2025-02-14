import react from "react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";
import FloatingButtons from "../FloatingButtons";
import EndPart from "../homePage/End";
import Instagram from "../homePage/Instagram";

export default function AllServices(){
    return(
        <>
            <Navbar/>
            <FloatingButtons/>
            <h1 className="font-bold text-5xl text-center h-[16vh] mt-[15vh]">Explore All Our Services</h1>
            <div className="grid grid-cols-3 mx-[20vh] gap-[10vh] mb-[10vh]">
                <div className="w-[50vh] h-[50vh] bg-amber-50 text-center rounded-3xl shadow-2xs shadow-gray-300 mx-0">
                    <img className="w-[50vh] h-[30vh] rounded-3xl" src="src/assets/images/booking/wedding.jpg"/>
                    <h2 className="font-bold text-xl">Wedding Decoration</h2>
                    <p className="text-sm">Wedding decoration creates a magical and elegant ambiance by combining flowers, lights, drapes, and themed elements. </p>
                    <div className="flex flex-row mt-2 justify-center items-center">
                        <button className="bg-amber-400 rounded-lg h-[5vh] w-[15vh] font-bold text-white hover:bg-amber-500 hover:font-extrabold cursor-pointer">Book Now</button>
                    </div>
                </div>
                
            </div>
            <EndPart/>
            <Instagram/>
            <Footer/>
        </>
    )
}