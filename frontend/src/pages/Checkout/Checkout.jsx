import React, { useEffect, useState, useRef } from 'react'
import './checkout.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHotelById, reset } from '../../features/hotels/hotelSlice'
import {createBooking} from "../../features/bookings/bookingSlice"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { FaArrowRight, FaPlus } from 'react-icons/fa'
import { FaCheckCircle, FaDownload } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import BookingPrint from '../../components/BookingPrint/BookingPrint'
import Booking from '../../components/Booking/Booking'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = JSON.parse(localStorage.getItem('id'))
  const dates = JSON.parse(localStorage.getItem('dates'))
  const room = JSON.parse(localStorage.getItem('room'))
  const adult = JSON.parse(localStorage.getItem('adult'))
  const children = JSON.parse(localStorage.getItem('children'))
  const options = {"room":room, "adult":adult, "children": children}

  // console.log(options);

  const { user } = useSelector((state) => state.auth)
  const { hotel, isError, message, isLoading } = useSelector(
    (state) => state.hotels
  )
  const {booking} = useSelector((state) => state.bookings)

  const sd = new Date(dates[0].startDate)
  const ed = new Date(dates[0].endDate)
  const startDate = {
    weekday: sd.toLocaleDateString('en-us', { weekday: 'short' }),
    day: sd.toLocaleDateString('en-us', { day: 'numeric' }),
    month: sd.toLocaleDateString('en-us', { month: 'short' }),
    year: sd.getFullYear(),
  }
  const endDate = {
    weekday: ed.toLocaleDateString('en-us', { weekday: 'short' }),
    day: ed.toLocaleDateString('en-us', { day: 'numeric' }),
    month: ed.toLocaleDateString('en-us', { month: 'short' }),
    year: ed.getFullYear(),
  }

  const [openT, setOpenT] = useState(true)
  const [openPay, setOpenPay] = useState(false)
  const [openCard, setOpenCard] = useState(true)
  const [openUPI, setOpenUPI] = useState(false)
  const [openPayAtHotel, setOpenPayAtHotel] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [paymetMethod, setPaymentMethod] = useState('')
  const [openViewBreakup, setOpenViewBreakup] = useState(false)

  const [userData, setUserData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    mobile: user ? user.mobile : '',
  })

  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const cardClick = () => {
    setOpenUPI(false)
    setOpenPayAtHotel(false)
    setOpenCard(true)
  }
  const upiClick = () => {
    setOpenPayAtHotel(false)
    setOpenCard(false)
    setOpenUPI(true)
  }
  const payAtHotelClick = () => {
    setOpenCard(false)
    setOpenUPI(false)
    setOpenPayAtHotel(true)
  }

  useEffect(() => {
    dispatch(getHotelById(id))

    return () => {
      dispatch(reset)
    }
  }, [navigate, isError, message, dispatch])

  const handlePClick = () => {
    const t = openT
    const tt = openPay
    if (tt) {
      setOpenPay(false)
    }
    setOpenT(!t)
  }

  const handlePFormClick = () => {
    const t = openT
    const tt = openPay
    setOpenT(!t)
    setOpenPay(!tt)
  }

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const dayDifference = (d1, d2) => {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  const days = dayDifference(sd, ed)

  const hotelPriceAfterDiscount = options.room * hotel.price * days
  const hotelPriceBeforeGST = Math.round((hotelPriceAfterDiscount * 100) / 112)
  const HotelPriceBeforeDiscount = Math.round((hotelPriceBeforeGST * 100) / 52)
  const newDate = new Date()
  let currDate = `${newDate.toLocaleDateString()}-${newDate.toLocaleTimeString()}`

  const bookingData = {
    userId: user._id,
    hotelId: id,
    peopleCount: options.adult,
    roomCount: options.room,
    checkInDate: sd,
    checkOutDate: ed,
    nightCount: days,
    totalAmount: hotelPriceAfterDiscount,
    city: hotel.title,
    paid: paymetMethod==="PayAtHotel"|| paymetMethod==="" ? false : true,
    booked: true,
    cancelled: false,
    paymentMethod: paymetMethod
  }

  const handlePayment = (e) => {
    e.preventDefault()
    const t = paymentComplete
    setPaymentComplete(!t)
    dispatch(createBooking(bookingData))

  }

  const componentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'BookindDetails',
    onBeforeGetContent: () => setDownloading(true),
    onAfterPrint: () => setDownloading(false),
  })

  

  return (
    <div className='checkout-wrapper'>
      
      <div className='checkout container'>
        <div className='unp'>
          
          <ul>
            {openViewBreakup && (
              <div
                className='booking-confirm'
                onClick={() => setOpenViewBreakup(!openViewBreakup)}
              >
                <div className='view-breakup-card'>
                  <div className='data'>
                    <h1>Price Breakup & Offers Applied</h1>
                    <p>{`${options.room} room, ${days} night`}</p>
                    <div className='item'>
                      <div className='text'>Room Tariff</div>
                      <div className='value bold'>
                        ₹{HotelPriceBeforeDiscount}
                      </div>
                    </div>
                    <div className='item'>
                      <div className='text'>
                        <span className='yellow bold'>STEAL DEAL</span> (48%
                        off)coupon applied)
                      </div>
                      <div className='value yellow'>
                        -₹{Math.round((HotelPriceBeforeDiscount * 48) / 100)}
                      </div>
                    </div>
                    <hr />
                    <div className='item'>
                      <div className='text bold'>Pre-tax Price</div>
                      <div className='value bold'>₹{hotelPriceBeforeGST}</div>
                    </div>
                    <div className='item'>
                      <div className='text'>Taxes (@12%)</div>
                      <div className='value'>
                        ₹{(hotelPriceBeforeGST * 12) / 100}
                      </div>
                    </div>
                    <div className='item'>
                      <div className='text bold'>Final Price</div>
                      <div className='value bold'>
                        ₹{hotelPriceAfterDiscount}
                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <div className='item'>
                      <div className='text'>Total Payble</div>
                      <div className='value'>₹{hotelPriceAfterDiscount}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: 'none' }}>
              {
                // paymentComplete && <Booking paymentComplete={paymentComplete} bookingData={bookingData} />
              }
              <BookingPrint
                bookingId={booking && booking._id}
                paymetMethod={paymetMethod}
                hotelPrice={hotelPriceAfterDiscount}
                night={days}
                option={options}
                startDate={startDate}
                endDate={endDate}
                currDate={currDate}
                userData={userData}
                hotel={hotel}
                user={user}
                ref={componentPDF}
              />
            </div>
            {paymentComplete && (
              <li>
                <div className='booking-confirm'>
                  <div className='booking-confirmed-card'>
                    <div className='cross-icon'>
                      <FaPlus
                        onClick={() => setPaymentComplete(!paymentComplete)}
                      />
                    </div>

                    <h1>Booking Confirmed!</h1>
                    <p>
                      We are pleased to inform is that your reservation request
                      has been recieved and confirmed.
                    </p>
                    <div className='h-line'></div>
                    <h1>{hotel && hotel.title}</h1>
                    <p>{hotel && hotel.address}</p>
                    <div className='h-line'></div>
                    <div className='booked-details'>
                      <div className='item'>
                        <div className='text'>Booking ID</div>
                        <div className='data'>{booking && booking._id}</div>
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
                        <div className='data'>{options.adult}</div>
                      </div>
                      <div className='item'>
                        <div className='text'>Rooms</div>
                        <div className='data'>{options.room}</div>
                      </div>
                      <div className='item'>
                        <div className='text'>Room Type</div>
                        <div className='data'>Oak</div>
                      </div>
                      <div className='item'>
                        <div className='text'>Payment Status</div>
                        <div className='data'>
                          {paymetMethod === 'PayAtHotel'
                            ? 'Due to be pay at hotel'
                            : 'Paid'}
                        </div>
                      </div>
                      <div className='item'>
                        <div className='text'>Total Amount</div>
                        <div className='data'>{`${hotelPriceAfterDiscount}.00`}</div>
                      </div>
                    </div>
                    <div className='h-line'></div>

                    <div className='buttons'>
                      <button onClick={() => navigate('/bookings')}>View Bookings</button>
                      <button onClick={generatePDF}>
                        {!downloading && (
                          <FaDownload className='download-icon' />
                        )}
                        {downloading ? 'Downloading...' : 'Download'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )}
            <li>
              <div className='checkout_section'>
                <div className='checkout_index'>
                  <FaCheckCircle className='icon' />
                </div>
                <div>
                  <h2 className='checkout-section-title'>
                    Enter Details of Primary Traveller
                  </h2>
                  {!openT && (
                    <p className='checkout-section-subtitle-wraped'>
                      {user && userData.name}, {user && userData.mobile}
                    </p>
                  )}
                  {!openT && (
                    <button className='edit-btn' onClick={handlePClick}>
                      Edit
                    </button>
                  )}
                  {openT && (
                    <>
                      <div className='checkout-section-subtitle'>
                        Who is the main traveller?
                      </div>
                      <form
                        action=''
                        className='checkout-form'
                        onSubmit={handlePFormClick}
                      >
                        <div className='formsy-input'>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            value={userData.name}
                            required
                            onChange={handleChange}
                          />
                          <label htmlFor='name'>Name</label>
                        </div>
                        <div className='formsy-input'>
                          <input
                            type='text'
                            className='numInput'
                            name='mobile'
                            id='mobile'
                            // min={0000000000}
                            // max={9999999999}
                            minLength={10}
                            maxLength={10}
                            value={userData.mobile}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor='mobile'>Mobile Number</label>
                        </div>
                        <div className='formsy-input'>
                          <input
                            type='email'
                            name='email'
                            id='email'
                            value={userData.email}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor='email'>Email</label>
                        </div>
                        <div className='checkout-form-checkbox'>
                          <input type='checkbox' />
                          <span>
                            I want to receive whatsapp updates for my booking
                          </span>
                        </div>
                        <button type='submit' className='checkout-action'>
                          continue
                        </button>
                        <p className='checkout-msg-header'>Important Notice</p>
                        <p className='checkout-msg'>
                          PlanYourTrip welcomes unmarried couples. Guests can
                          check in using any local or outstation ID proof (PAN
                          card not accepted).
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className='checkout_section'>
                <div className='checkout_index'>
                  <FaCheckCircle
                    className={!openPay ? 'iconDisable' : 'icon'}
                  />
                </div>
                <div>
                  <h2
                    className={
                      openPay
                        ? 'checkout-section-title'
                        : 'checkout-section-titleDisable'
                    }
                  >
                    Payment options
                  </h2>
                </div>

                {openPay && (
                  <div className='checkout-payment'>
                    <div className='payment-tab-list'>
                      <ul className=''>
                        <li
                          onClick={cardClick}
                          className={openCard ? 'pActive' : ''}
                        >
                          Credit/Debit Card
                        </li>
                        <li
                          onClick={upiClick}
                          className={openUPI ? 'pActive' : ''}
                        >
                          Wallet/ UPI
                        </li>
                        <li
                          onClick={payAtHotelClick}
                          className={openPayAtHotel ? 'pActive' : ''}
                        >
                          Pay at Hotel
                        </li>
                      </ul>
                    </div>
                    <div className='payment-details'>
                      {openCard && (
                        <form className='card-detail' onSubmit={handlePayment}>
                          <div className='formsy-input'>
                            <input
                              type='text'
                              name='cnumber'
                              id='cnumber'
                              minLength={12}
                              maxLength={12}
                              required
                            />
                            <label htmlFor='cnumber'>Card Number</label>
                          </div>
                          <div className='formsy-input'>
                            <input
                              type='text'
                              name='chname'
                              id='chname'
                              required
                            />
                            <label htmlFor='chname'>Card Holder's Name</label>
                          </div>
                          <div className='expiry'>
                            <p>Expiry Date</p>
                            <div className='edate'>
                              <select name='month' id='month' required>
                                <option value=''>MONTH</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                              </select>
                              <select
                                name='year'
                                id='year'
                                className='ml-20'
                                required
                              >
                                <option value=''>YEAR</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                                <option>2030</option>
                              </select>
                            </div>
                          </div>
                          <button
                            type='submit'
                            className='checkout-action'
                            onClick={() => setPaymentMethod('PayAtHotel')}
                          >
                            PAY NOW
                          </button>
                        </form>
                      )}
                      {openUPI && (
                        <form onSubmit={handlePayment}>
                          <div className='formsy-input'>
                            <input type='text' name='upi' id='upi' required />
                            <label htmlFor='email'>
                              Enter your UPI address
                            </label>
                          </div>
                          <button
                            type='submit'
                            className='checkout-action'
                            onClick={() => setPaymentMethod('UPI')}
                          >
                            PROEED TO PAY ₹{hotelPriceAfterDiscount}
                          </button>
                        </form>
                      )}
                      {openPayAtHotel && (
                        <form onSubmit={handlePayment}>
                          <p className='pay-at-hotel-subtitle'>
                            You might be required to confirm your booking over a
                            phone call or by making a part payment a few days
                            before your checkin date.
                          </p>
                          <button
                            type='submit'
                            className='checkout-action'
                            onClick={() => setPaymentMethod('PayAtHotel')}
                          >
                            PROEED TO BOOK FOR ₹{hotelPriceAfterDiscount}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='bookingContainer'>
            <div className='headerImage'>
              {hotel.photos ? (
                <img src={hotel ? hotel.photos[1] : ''} alt='loading' />
              ) : (
                <img src='' alt='loading' />
              )}
            </div>
            <div className='desc'>
              <h3>{hotel.title}</h3>
              <p>{hotel.address}</p>
            </div>
            <div className='dates'>
              <div className='startDate'>
                <div className='date'>
                  {startDate.weekday}, {startDate.day} {startDate.month}
                </div>
                <div className='span'>Check In</div>
              </div>
              <div className='arrow'>
                <FaArrowRight />
              </div>
              <div className='endDate'>
                <div className='date'>
                  {endDate.weekday}, {endDate.day} {endDate.month}
                </div>
                <div className='span'>Check Out</div>
              </div>
              <div className='totalNight'>
                <div className='night'>{days}</div>
                <div className='span'>Night</div>
              </div>
            </div>
            <div className='hline'></div>
            <div className='rooms'>
              <div className='room'>
                <div className='nRoom'>{options.room}</div>
                <div className='text'>Room</div>
              </div>
              <div className='guest'>
                <div className='nRoom'>{options.adult} Adult</div>
                <div className='text'>No. of Adults</div>
              </div>
            </div>
            <div className='roomtype'>
              <div className='nRoom'>Oak </div>
              <div className='text'>Stay Type</div>
            </div>
            <div className='hline'></div>
            <div className='payment'>
              <div className='pText'>
                <div className='t1'>Total Payable</div>
                <div className='t2' onClick={() => setOpenViewBreakup(true)}>
                  View Breakup
                </div>
              </div>
              <div className='rType'>Non-Refundable</div>
              <div className='pValue'>
                <div className='price'>₹{hotelPriceAfterDiscount}</div>
                <div className='dPrice'>₹{HotelPriceBeforeDiscount}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
