import React from "react";
const path='../../assets/images/home/end.webp'

export default function EndPart(){
    return (
        <div className="flex justify-center bg-[#FFF5ED]">
            <div className="bg-[url('assets/images/home/end.jpg')] h-100 w-250 mb-2">
                <div className="pt-45 pl-20">
                    <h2 className="text-4xl font-medium">Let us decorate<br/>your venue</h2>
                    <button className="bg-black rounded-2xl ml-8 mt-3 h-10 w-25 text-white hover:bg-amber-200 hover:text-black hover:border-black hover:border-2 hover:font-bold cursor-pointer">Contact Us</button>
                </div>
            </div>
        </div>
    )
}