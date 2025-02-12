import React from 'react'
import Navbar from '../Navbar/Navbar'
import TopComponnent from '../homePage/Top'
import Footer from '../Footer/Footer'
import ServiceComponent from '../homePage/ServiceComponent'
import HeroSection from '../homePage/HeroSection'
import FramerMotion from '../homePage/FreamerMotion'
import HoverCard from '../homePage/ServiceHoverCard'
import EndPart from '../homePage/end'
import Instagram from '../homePage/Instagram'

const FinalComponent = () => {
  // return (<div className='[#FBFBFB]'>
  return (<div className='bg-amber-50'>
    <Navbar/>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    <HoverCard/>
    <EndPart/>
    <Instagram/>
    <Footer/>
    </div>
  )
}

export default FinalComponent