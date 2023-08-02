import React from 'react'
import './bookingprint.css'

const BookingPrint = React.forwardRef(
  ({ hotel,bookingId, paymetMethod, night,hotelPrice, option, startDate, endDate, user, userData, currDate }, ref) => {
    return (
      <div ref={ref} className='bp-container'>
        <div className='booking-confirmed-card'>
          <div className='header-image'>
            <img src={hotel.photos && hotel.photos[0]} alt='Hotel Image' />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>
            We are pleased to inform is that your reservation request has been
            recieved and confirmed.
          </p>
          <div className='h-line'></div>
          <h1>{hotel && hotel.title}</h1>
          <p>{hotel && hotel.address}</p>
          <div className='h-line'></div>
          <div className='booked-details'>
            <div className='item'>
              <div className='text'>Booking ID</div>
              <div className='data'>{bookingId}</div>
            </div>
            <div className='item'>
              <div className='text'>Booking Date & Time</div>
              <div className='data'>{currDate}</div>
            </div>
            <div className='item'>
              <div className='text'>Primary traveller</div>
              <div className='data'>{userData && userData.name}</div>
            </div>
            <div className='item'>
              <div className='text'>Check In</div>
              <div className='data'>{`${startDate.weekday}, ${startDate.day} ${startDate.month} ${startDate.year}`}</div>
            </div>
            <div className='item'>
              <div className='text'>Check Out</div>
              <div className='data'>{`${endDate.weekday}, ${endDate.day} ${endDate.month} ${endDate.year}`}</div>
            </div>
            <div className='item'>
              <div className='text'>Total Guests</div>
              <div className='data'>{option.adult}</div>
            </div>
            <div className='item'>
              <div className='text'>Total Rooms</div>
              <div className='data'>{option.room}</div>
            </div>
            <div className='item'>
              <div className='text'>Total Nights</div>
              <div className='data'>{night}</div>
            </div>
            <div className='item'>
              <div className='text'>Room Type</div>
              <div className='data'>Oak</div>
            </div>
            <div className='item'>
              <div className='text'>Payment Status</div>
              <div className='data'>{paymetMethod==="PayAtHotel" ? "Due to be pay at hotel": "Paid"}</div>
            </div>
            <div className='item'>
              <div className='text'>Total Amount</div>
              <div className='data'>{`${hotelPrice}.00`}</div>
            </div>
            <div className='item'>
              <div className='text'>Payment Method</div>
              <div className='data'>{paymetMethod}</div>
            </div>
          </div>
          <div className='h-line'></div>
        </div>
      </div>
    )
  }
)

export default BookingPrint
