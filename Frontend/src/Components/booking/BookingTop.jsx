import React from "react";

export default function BookingTop() {
  return (
    <div className="w-full">
      {/* Heading Section */}
      <div className="text-center py-6 sm:py-8 md:py-10">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
          Book your dates for DECORATION
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-10 md:pb-12">
        <div className="text-center w-full max-w-xs sm:max-w-none px-2 sm:px-4">
          <h2 className="text-xs sm:text-sm md:text-base font-medium">
            Mark the date in the Calender
          </h2>
        </div>
        <div className="text-center w-full max-w-xs sm:max-w-none px-2 sm:px-4">
          <h2 className="text-xs sm:text-sm md:text-base font-medium">
            Our expert will connect soon. Get ready to enjoy the best
            personalised shopping experience.
          </h2>
        </div>
        <div className="text-center w-full max-w-xs sm:max-w-none px-2 sm:px-4">
          <h2 className="text-xs sm:text-sm md:text-base font-medium">
            Now you may relax and let us decorater your package of happiness.
          </h2>
        </div>
      </div>
    </div>
  );
}




// import react from "react";

// export default function BookingTop(){
//     return(
//         <div>
//           <div className="text-center h-40 pt-15 mt">
//               <h1 className="text-5xl font-medium">Book your dates for DECORATION</h1>
//           </div>
//           <div className="flex flex-row justify-center h-35">
//               <div className="text-center mx-10 font-medium text-lg">
//                   <h2>Mark the date in the Calender</h2>
//               </div>
//               <div className="text-center mx-10 font-medium text-lg">
//                   <h2>Our expert will connect soon. Get ready to<br/>enjoy the best personalised shopping<br/>experience.</h2>
//               </div>
//               <div className="text-center mx-10 font-medium text-lg">
//                   <h2>Now you may relax and let us<br/>to decorater your package of happiness.</h2>
//               </div>
//           </div>
//         </div>
//     )
// }
