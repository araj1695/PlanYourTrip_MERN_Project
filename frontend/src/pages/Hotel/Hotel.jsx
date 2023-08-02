import React, { useEffect, useState } from 'react'
import './hotel.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getHotelById, reset } from "../../features/hotels/hotelSlice"
import Spinner from '../../components/Spinner/Spinner';


const Hotel = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  const {hotel, isLoading, isError, message }  = useSelector((state) => state.hotels)
  const [data, setData] = useState({})
  
  useEffect(() => {
    dispatch(getHotelById(id))

    return () => {
        dispatch(reset)
    }
  },[navigate, isError, message, dispatch])


  const dates = JSON.parse(localStorage.getItem('dates'))
  const room = JSON.parse(localStorage.getItem('room'))
  const adult = JSON.parse(localStorage.getItem('adult'))
  const children = JSON.parse(localStorage.getItem('children'))
  const options = {"room":room,"adult":adult, "children":children}
  // console.log(options);

  const id = location.pathname.split('/')[2]

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const dayDifference = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user) {
      navigate('/checkout', { state: {dates, options, id} })
    } else {
      navigate('/login')
    }
  }

  // console.log(options);



  return (
    <div>
      {isLoading ? (
        <Spinner/>
      ) : (
        <div className='hotelContainer'>
          {open && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='sliderWrapper'>
                <img
                  src={hotel.photos[slideNumber]}
                  alt=''
                  className='sliderImg'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className='hotelWrapper'>
            <button className='bookNow' onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className='hotelTitle'>{hotel.title}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location – {hotel.distance}
            </span>
            <span className='hotelPriceHighlight'>
              Book a stay over Rs:{hotel.price} at this property and get
              a free airport taxi
            </span>
            <div className='hotelImages'>
              {hotel.photos?.map((photo, i) => (
                <div className='hotelImgWrapper' key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=''
                    className='hotelImg'
                  />
                </div>
              ))}
            </div>
            <div className='hotelDetails'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{hotel.title}</h1>
                <p className='hotelDesc'>{hotel.description}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>Rs:{days * hotel.price * (options ? options.room : 0)}</b> ({days}{' '}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hotel
