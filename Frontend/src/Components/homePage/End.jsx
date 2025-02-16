// import React from "react";

// export default function EndPart() {
//     return (
//         <div className="flex justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
//             <div 
//                 className="bg-[url('assets/images/home/end.jpg')] bg-cover bg-right md:bg-center lg:bg-cover h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[40rem] xl:h-[50rem] w-full mb-2 flex items-center justify-start"
//             >
//                 <div className="pt-8 pl-6 sm:pt-12 sm:pl-10 md:pt-20 md:pl-14 lg:pt-24 lg:pl-16">
//                     <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight">
//                         Let us decorate<br />your venue
//                     </h2>
//                     <button className="bg-black rounded-2xl mt-3 h-10 w-32 text-white hover:bg-amber-200 hover:text-black hover:border-black hover:border-2 hover:font-bold cursor-pointer">
//                         Call to Action
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from "react";
const path='../../assets/images/home/end.webp'

export default function EndPart(){
    return (
        <div className="flex justify-center">
            <div className="bg-[url('assets/images/home/end.jpg')] h-100 w-250 mb-2">
                <div className="pt-45 pl-20">
                    <h2 className="text-4xl font-medium">Let us decorate<br/>your venue</h2>
                    <button className="bg-black rounded-2xl ml-8 mt-3 h-10 w-30 text-white hover:bg-amber-200 hover:text-black hover:border-black hover:border-2 hover:font-bold cursor-pointer">Call to Action</button>
                </div>
            </div>
        </div>
    )
}