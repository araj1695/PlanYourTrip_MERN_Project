import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Registration from './pages/Registration/Registration'
import UserDetails from './pages/UserDetails/UserDetails'
import Footer from './components/Footer/Footer'
import Hotels from './pages/Hotels/Hotels'
import Hotel from './pages/Hotel/Hotel'
import Checkout from './pages/Checkout/Checkout'
import BookingPrint from './components/BookingPrint/BookingPrint'
import Bookings from './pages/Bookings/Bookings'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/userdetails' element={<UserDetails />} />
          <Route path='/hotels' element={<Hotels />} />
          <Route path='/hotels/:id' element={<Hotel />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/bookprint' element={<BookingPrint />} />



        </Routes>
      </Router>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default App
