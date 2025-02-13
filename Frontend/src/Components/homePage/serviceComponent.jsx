import React from "react";
import furniture from "../../assets/images/home/furniture.jpg"
export default function ServiceComponent() {
    return (
        <div className="flex flex-col justify-center pb-15 bg-[#FFF5ED]">
            <h2 className="mt-8 mb-4 text-center font-inter font-bold text-5xl">Find your service</h2>
            <p className="text-center font-inter text-2xl">Discover top-rated pros for any budget, background and style.</p>
            <div className="grid grid-cols-3 gap-5 w-250 mx-70 mt-6">
                <div className="flex flex-col w-100 h-[660px] pt-10">
                    <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')] mb-5">
                        <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
                        <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
                    </div>
                    <div className="bg-blue-300 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs">
                        <h2 className="text-xl font-semibold mb-2">Haldi</h2>
                        <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
                        <div className="flex justify-center mt-4">
                            <img src={furniture} className="rounded-lg w-44 h-28" />
                        </div>
                        <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                            See photographers
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-100 h-[660px] pb-10">
                    <div className="bg-orange-400 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs mb-5">
                        <h2 className="text-xl font-semibold mb-2">Haldi</h2>
                        <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
                        <div className="flex justify-center mt-4">
                            <img src={furniture} className="rounded-lg w-44 h-28" />
                        </div>
                        <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                            See photographers
                        </button>
                    </div>
                    <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')]">
                        <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
                        <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
                    </div>
                </div>
                <div className="flex flex-col w-100 h-[660px] pt-10">
                    <div className="w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[url('assets/images/home/haldi.gif')] mb-5">
                        <h2 className="text-white text-bold text-3xl font-semibold mt-15">Haldi</h2>
                        <p className="text-white text-bold underline underline-offset-3">Browse galleries to find your look.</p>
                    </div>
                    <div className="bg-yellow-300 w-100 h-[320px] p-6 rounded-2xl shadow-lg text-center max-w-xs">
                        <h2 className="text-xl font-semibold mb-2">Haldi</h2>
                        <p className="text-gray-700 mt-1">Browse galleries to find your look.</p>
                        <div className="flex justify-center mt-4">
                            <img src={furniture} className="rounded-lg w-44 h-28" />
                        </div>
                        <button className="mt-4 px-4 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                            See photographers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}