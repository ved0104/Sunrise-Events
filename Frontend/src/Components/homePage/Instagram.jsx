import React from "react";
import instaLogo from "../../assets/instagram.png"

export default function Instagram(){
    return (
        <div className="flex flex-row justify-center items-center">
            <div>
                <a href="https://www.instagram.com/sunriseevents.in/" target="_blank"> <img className='h-25 w-25' src={instaLogo} /> </a>
            </div>
            <div>
                <h2 className="font-thin text-xl">Follow us on</h2>
                <h2 className="font-bold text-3xl">Instagram</h2>
            </div>
        </div>
    )
}