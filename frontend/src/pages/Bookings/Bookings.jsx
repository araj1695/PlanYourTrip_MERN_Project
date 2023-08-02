import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import {
  getBookingsByUserId,
  updateBookingStatus,
  reset,
} from '../../features/bookings/bookingSlice'
import { useDispatch, useSelector } from 'react-redux'
import './bookings.css'
import { useNavigate } from 'react-router-dom'

const Bookings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { bookings,booking, isError, message, isLoading } = useSelector(
    (state) => state.bookings
  )

  const [openCancel, setOpenCancel] = useState(false)
  const [bData, setBdata] = useState({
    id: "",
    b: false,
    c: false
  })

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    dispatch(getBookingsByUserId(user && user._id))
    return () => {
      dispatch(reset)
    }
  }, [navigate,isError, message, dispatch, booking, user])

  const getDate = (d) => {
    const weekday =  d.toLocaleDateString('en-us', { weekday: 'short' })
    const day =  d.toLocaleDateString('en-us', { day: 'numeric' })
    const month =  d.toLocaleDateString('en-us', { month: 'short' })
    const year =  d.getFullYear()
    return `${weekday}, ${day} ${month} ${year}`
  }

  const handleUpdateBooking = async () => {
    await dispatch(updateBookingStatus(bData))
    setOpenCancel(false)
  }

  const setUpdateBooking = (id, b,c) => {
    setOpenCancel(true)
    setBdata({"id": id, "booked": !b, "cancelled":!c})

  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {
        openCancel && (
          <div className="cancel">
            <div className="cancel-card">
              <h2>Do your really want to cancel booking ?</h2>
              <div className="buttons">
                <button onClick={handleUpdateBooking}>Yes</button>
                <button onClick={() => setOpenCancel(false)}>No</button>
              </div>
            </div>
          </div>
        )
      }
      <div className='bookings container'>
        <h1>Bookings</h1>
        <div className='table'>
              <table>
                <tr>
                  <th>Booking Id</th>
                  <th>Hotel</th>
                  <th>Payment Status</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
                  <th>Total Night</th>
                  <th>Booking Status</th>
                  <th></th>
                </tr>
                {bookings &&
                bookings.map((b) => (
                  <tr key={b._id}>
                  <td>{b._id}</td>
                  <td>{b.city}</td>
                  <td>{b.paid ? "Paid": "Due to be Pay at hotel"}</td>
                  <td>
                    {getDate(new Date(b.checkInDate))}
                  </td>
                  <td>
                  {getDate(new Date(b.checkOutDate))}
                  </td>
                  <td>{b.nightCount}</td>
                  <td>{b.booked ? "Booked" : "Cancelled"}</td>
                  {
                    b.booked && (
                      <button onClick={() => setUpdateBooking(b._id, b.booked, b.cancelled)} style={{border:"none"}}>Cancel Booking</button>
                    )
                  }
                </tr>
                ))}
              </table>
            </div>
        
      </div>
    </div>
  )
}

export default Bookings
