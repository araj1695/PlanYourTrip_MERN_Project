import React, { useEffect } from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { createBooking, reset } from '../../features/bookings/bookingSlice'
import { useDispatch, useSelector } from 'react-redux'

const Booking = (props) => {
  const dispatch = useDispatch()
  const {booking, isError, message, isLoading } = useSelector(
    (state) => state.bookings
  )
  useEffect(() => {
    dispatch(createBooking(props.bookingData))
    return () => {
      dispatch(reset)
    }
  }, [isError, message, dispatch])

  booking && localStorage.setItem("bookingId", booking._id)

  console.log(booking)

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    booking
    </>
  )
}

export default Booking
