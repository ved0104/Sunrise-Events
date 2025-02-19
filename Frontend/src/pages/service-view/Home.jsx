import React from 'react'
import TopComponnent from '../../Components/homePage/Top'
import ServiceComponent from '../../Components/homePage/serviceComponent'
import HeroSection from "../../Components/homePage/HeroSection"
import FramerMotion from "../../Components/homePage/FreamerMotion"
import HoverCard from '../../Components/homePage/ServiceHoverCard'
import Testimonials from '../../Components/homePage/Testimonials'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const home = () => {
  const location=useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (<>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    <HoverCard/>
    <Testimonials/>
</>
  )
}

export default home