import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Footer from '../../components/Footer/Footer'
import AddService from '../../Components/admin/AddService'
import ManageServices from '../../Components/admin/ManageServices'
import AllServices from '../../Components/booking/AllServices'
import ManageUsers from "../../Components/admin/ManageUsers"
import AdminDashboardPage from './DashboardPage'
const AdminHome = () => {
  return (
    <div className='pt-20 pb-20'>
    <Navbar/>
    <AdminDashboardPage/>
    {/* <AllServices/> */}
    <Footer/>
    </div>
  )
}

export default AdminHome