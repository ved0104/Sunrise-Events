import React from 'react'
import BookingCalendar from '../../Components/booking/BookingCalender'
import BookingDecoration from '../../Components/booking/BookingDecoration'
import BookingTop from '../../Components/booking/BookingTop'
import EndPart from '../../Components/homePage/End'
import Navbar from '../../Components/Navbar/navbar'
import Footer from '../../Components/Footer/Footer'

const Booking = () => {
  return(
        <>
         <Navbar/>
          <div className="flex flex-col justify-center items-center mt-15">
          <div className="bg-amber-50 w-300 my-12 rounded-3xl border-2 border-amber-100">
            <BookingTop/>
            <BookingCalendar/>
          </div>
          <BookingDecoration/>
        </div>
        <EndPart/>
        <Footer/>
        </>
      )
}

export default Booking