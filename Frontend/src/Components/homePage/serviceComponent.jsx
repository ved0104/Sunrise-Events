


import React from "react";
import furniture from "../../assets/images/home/furniture.jpg";
import haldiGif from "../../assets/images/home/haldi.gif";

export default function ServiceComponent() {
    return (
        <div className="flex flex-col items-center pb-10 px-4 md:px-10 lg:px-20">
            <h2 className="mt-8 mb-4 text-center font-inter font-bold text-3xl md:text-4xl lg:text-5xl">
                Find your service
            </h2>
            <p className="text-center font-inter text-lg md:text-xl lg:text-2xl max-w-2xl">
                Discover top-rated pros for any budget, background, and style.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mt-6">
                {/* First Row */}
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center bg-blue-300">
                    <h2 className="text-base md:text-lg font-semibold mb-1">Photographers</h2>
                    <p className="mt-1 text-gray-700">Browse galleries to find your look.</p>
                    <div className="flex justify-center mt-3">
                        <img src={furniture} className="rounded-lg w-20 h-12 md:w-28 md:h-18" alt="Photographers" />
                    </div>
                    <button className="mt-3 px-3 py-1 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                        See more
                    </button>
                </div>
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center h-[180px] md:h-[260px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${haldiGif})` }}>
                    <h2 className="text-white text-xl md:text-2xl font-semibold">Outdoor Spaces</h2>
                    <p className="mt-1 text-white font-semibold underline underline-offset-3">See outdoor spaces.</p>
                </div>
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center bg-green-300">
                    <h2 className="text-base md:text-lg font-semibold mb-1">Barns</h2>
                    <p className="mt-1 text-gray-700">See barns.</p>
                    <div className="flex justify-center mt-3">
                        <img src={furniture} className="rounded-lg w-20 h-12 md:w-28 md:h-18" alt="Barns" />
                    </div>
                    <button className="mt-3 px-3 py-1 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                        See more
                    </button>
                </div>
                
                {/* Second Row - Alternating */}
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center h-[180px] md:h-[260px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${haldiGif})` }}>
                    <h2 className="text-white text-xl md:text-2xl font-semibold">Cakes</h2>
                    <p className="mt-1 text-white font-semibold underline underline-offset-3">Meet bakers and set up tastings.</p>
                </div>
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center bg-orange-400">
                    <h2 className="text-base md:text-lg font-semibold mb-1">DJs</h2>
                    <p className="mt-1 text-gray-700">Keep your dance floor moving.</p>
                    <div className="flex justify-center mt-3">
                        <img src={furniture} className="rounded-lg w-20 h-12 md:w-28 md:h-18" alt="DJs" />
                    </div>
                    <button className="mt-3 px-3 py-1 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                        See more
                    </button>
                </div>
                <div className="w-full p-3 md:p-5 rounded-2xl shadow-lg text-center flex flex-col items-center h-[180px] md:h-[260px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${haldiGif})` }}>
                    <h2 className="text-white text-xl md:text-2xl font-semibold">Historic Buildings</h2>
                    <p className="mt-1 text-white font-semibold underline underline-offset-3">See historic buildings.</p>
                </div>
            </div>
        </div>
    );
}




// import React from "react";
// import furniture from "../../assets/images/home/furniture.jpg"
// export default function ServiceComponent() {
//     return (
//         <div className="flex flex-col justify-center pb-15">
//             <h2 className="mt-8 mb-4 text-center font-inter font-bold text-5xl">Find your service</h2>
//             <p className="text-center font-inter text-2xl">Discover top-rated pros for any budget, background and style.</p>
//             <div className="grid grid-cols-3 gap-5 w-250 mx-70 mt-6">
//                 <div className="flex flex-col w-100 h-[660px] pt-10">
//                     <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')] mb-5">
//                         <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
//                         <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
//                     </div>
//                     <div className="bg-blue-300 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs">
//                         <h2 className="text-xl font-semibold mb-2">Haldi</h2>
//                         <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
//                         <div className="flex justify-center mt-4">
//                             <img src={furniture} className="rounded-lg w-44 h-28" />
//                         </div>
//                         <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
//                             See photographers
//                         </button>
//                     </div>
//                 </div>
//                 <div className="flex flex-col w-100 h-[660px] pb-10">
//                     <div className="bg-orange-400 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs mb-5">
//                         <h2 className="text-xl font-semibold mb-2">Haldi</h2>
//                         <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
//                         <div className="flex justify-center mt-4">
//                             <img src={furniture} className="rounded-lg w-44 h-28" />
//                         </div>
//                         <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
//                             See photographers
//                         </button>
//                     </div>
//                     <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')]">
//                         <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
//                         <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
//                     </div>
//                 </div>
//                 <div className="flex flex-col w-100 h-[660px] pt-10">
//                     <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')] mb-5">
//                         <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
//                         <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
//                     </div>
//                     <div className="bg-yellow-300 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs">
//                         <h2 className="text-xl font-semibold mb-2">Haldi</h2>
//                         <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
//                         <div className="flex justify-center mt-4">
//                             <img src={furniture} className="rounded-lg w-44 h-28" />
//                         </div>
//                         <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
//                             See photographers
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }