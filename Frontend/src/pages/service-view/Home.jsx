import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import TopComponnent from '../../Components/homePage/Top'
import ServiceComponent from '../../Components/homePage/ServiceComponent'
import HeroSection from "../../Components/homePage/HeroSection"
import FramerMotion from "../../Components/homePage/FreamerMotion"
const home = () => {
  return (<>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    </>
  )
}

export default home