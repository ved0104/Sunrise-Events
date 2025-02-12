import React from 'react'
import Navbar from '../Navbar/Navbar'
import TopComponnent from '../homePage/Top'
import Footer from '../Footer/Footer'
import ServiceComponent from '../homePage/ServiceComponent'
import HeroSection from '../homePage/HeroSection'
import FramerMotion from '../homePage/FreamerMotion'

const FinalComponent = () => {
  return (<div className='bg-amber-50'>
    <Navbar/>
    <TopComponnent/>
    <HeroSection/>
    <FramerMotion/>
    <ServiceComponent/>
    <Footer/>
    </div>
  )
}

export default FinalComponent