import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import TopComponnent from '../../Components/homePage/Top'
import ServiceComponent from '../../Components/homePage/ServiceComponent'

const home = () => {
  return (<>
    <TopComponnent/>
    <ServiceComponent/>
    </>
  )
}

export default home