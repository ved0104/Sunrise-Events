import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//import "./swiperStyles.css"; // Import custom styles

export default function Testimonials() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      modules={[Navigation, Pagination, Autoplay]}
      className="w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] mt-10 mb-20"
    >
      {[...Array(3)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[85vw] sm:max-w-[75vw] lg:max-w-[65vw] h-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex justify-center items-center text-white">
              <div
                className="absolute inset-0 bg-[url('/src/assets/images/testinomials/background2.jpg')] bg-cover bg-right sm:bg-center bg-no-repeat"
              ></div>
              <div className="absolute inset-0 bg-black opacity-65"></div>
              <div className="relative z-10 text-center px-4 sm:px-8">
                <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                  It was a very good decoration by the organisers
                </p>
                <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2">
                  - Atharv Gupta
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}



// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function Testimonials() {
//   return (
//     <Swiper
//   spaceBetween={20}
//   slidesPerView={1}
//   navigation
//   pagination={{ clickable: true }}
//   autoplay={{ delay: 5000 }}
//   modules={[Navigation, Pagination, Autoplay]}
//   className="w-[150vh] h-[70vh] mt-15 mb-25"
// >
//   {[...Array(3)].map((_, index) => (
//     <SwiperSlide key={index}>
//       <div className="flex justify-center">
//         <div className="relative w-[100vh] h-[70vh] flex justify-center items-center text-white">
//           <div
//             className="absolute inset-0 bg-[url('/src/assets/images/testinomials/background2.jpg')] bg-cover bg-center bg-no-repeat"
//           ></div>
//           <div className="absolute inset-0 bg-black opacity-65"></div>
//           <div className="relative z-10 text-center">
//             <p className="font-bold text-xl">It was a very good decoration by the organisers</p>
//             <h2 className="font-bold text-4xl">- Atharv Gupta</h2>
//           </div>
//         </div>
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>


//   )
// }
