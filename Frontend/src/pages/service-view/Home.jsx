import React from 'react'
import TopComponnent from '../../Components/homePage/Top'
import ServiceComponent from '../../Components/homePage/ServiceComponent'
import HeroSection from "../../Components/homePage/HeroSection"
import FramerMotion from "../../Components/homePage/FreamerMotion"
import HoverCard from '../../Components/homePage/ServiceHoverCard'
import Instagram from '../../Components/homePage/Instagram'
import EndPart from '../../Components/homePage/End'
const home = () => {
  return (<>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    <HoverCard/>
    <EndPart/>
    <Instagram/>
</>
  )
}

export default home