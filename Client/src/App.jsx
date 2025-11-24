import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cars from './pages/Cars'
import MyBooking from './pages/MyBooking'
import Home from "./pages/Home";
import CarDetails from './pages/CarDetails'
import Footer from './components/Footer'
import AddCar from './pages/owner/AddCar'
import ManageBooking from './pages/owner/ManageBooking'
import ManageCars from './pages/owner/ManageCars'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import Login from './components/Login'
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContex'


const App = () => {
  const {showLogin} = useAppContext()
 const ownerPath = useLocation().pathname.startsWith('/owner')

  return (
    <div>
       <Toaster/>
      {showLogin && <Login /> }
      {!ownerPath && <Navbar />}
       
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBooking/>}/>
        
        <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-car' element={<AddCar/>}/>
            <Route path="manage-bookings" element={<ManageBooking/>}/>
            <Route path="manage-cars" element={<ManageCars/>}/>
        </Route>
       </Routes>
       {!ownerPath && <Footer/>}

    </div>
  )
}

export default App


// primary: #2563EB;
// primary-dull:#1F58D8;
// light: #F1F5F9;
// borderColor: #c4c7d2;