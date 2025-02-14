import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    // <Swiper
    //   spaceBetween={20}
    //   slidesPerView={1}
    //   navigation
    //   pagination={{ clickable: true }}
    //   autoplay={{ delay: 5000 }}
    //   modules={[Navigation, Pagination, Autoplay]}
    //   className="w-[150vh] h-[70vh]"
    // >
    //   <SwiperSlide>
    //     <div className="flex justify-center">
    //         <div className="bg-[url('/src/assets/images/testinomials/background2.jpg')] w-[100vh] h-[70vh] bg-contain bg-no-repeat opacity-30 flex flex-col justify-center items-center text-white">
    //             <p className="font-bold text-xl">It was a very good decoration by the organisers</p>
    //             <h2 className="font-bold text-4xl">- Atharv Gupta</h2>
    //         </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="flex justify-center">
    //         <div className="bg-[url('/src/assets/images/testinomials/background2.jpg')] w-[100vh] h-[70vh] bg-contain bg-no-repeat opacity-30 flex flex-col justify-center items-center text-white">
    //             <p className="font-bold text-xl">It was a very good decoration by the organisers</p>
    //             <h2 className="font-bold text-4xl">- Atharv Gupta</h2>
    //         </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="flex justify-center">
    //         <div className="bg-[url('/src/assets/images/testinomials/background2.jpg')] w-[100vh] h-[70vh] bg-contain bg-no-repeat opacity-30 flex flex-col justify-center items-center text-white">
    //             <p className="font-bold text-xl">It was a very good decoration by the organisers</p>
    //             <h2 className="font-bold text-4xl">- Atharv Gupta</h2>
    //         </div>
    //     </div>
    //   </SwiperSlide>
    // </Swiper>
    <Swiper
  spaceBetween={20}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
  modules={[Navigation, Pagination, Autoplay]}
  className="w-[150vh] h-[70vh] mt-15 mb-25"
>
  {[...Array(3)].map((_, index) => (
    <SwiperSlide key={index}>
      <div className="flex justify-center">
        <div className="relative w-[100vh] h-[70vh] flex justify-center items-center text-white">
          <div
            className="absolute inset-0 bg-[url('/src/assets/images/testinomials/background2.jpg')] bg-cover bg-center bg-no-repeat"
          ></div>
          <div className="absolute inset-0 bg-black opacity-65"></div>
          <div className="relative z-10 text-center">
            <p className="font-bold text-xl">It was a very good decoration by the organisers</p>
            <h2 className="font-bold text-4xl">- Atharv Gupta</h2>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


  )
}
