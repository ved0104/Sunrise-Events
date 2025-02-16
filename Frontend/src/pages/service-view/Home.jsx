import React from 'react'
import TopComponnent from '../../Components/homePage/Top'
import ServiceComponent from '../../Components/homePage/ServiceComponent'
import HeroSection from "../../Components/homePage/HeroSection"
import FramerMotion from "../../Components/homePage/FreamerMotion"
import HoverCard from '../../Components/homePage/ServiceHoverCard'
import Testimonials from '../../Components/homePage/Testimonials'

const home = () => {
  return (<div className='bg-[#FFF5ED]'>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    <HoverCard/>
    <Testimonials/>
</div>
  )
}

export default home