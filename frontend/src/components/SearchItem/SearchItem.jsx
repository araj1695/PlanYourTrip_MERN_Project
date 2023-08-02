import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import './searchitem.css'

const SearchItem = (props) => {
  const navigate = useNavigate()
  const item = props.item
  const dates = props.dates
  const options = props.options
  // console.log(options);

  const handleClick = () => {
    localStorage.setItem('dates', JSON.stringify(dates))
    localStorage.setItem('room', JSON.stringify(options.room))
    localStorage.setItem('adult', JSON.stringify(options.adult))
    localStorage.setItem('children', JSON.stringify(options.children))
    localStorage.setItem('id', JSON.stringify(item._id) )
  }

  return (
    <div className='searchItem'>
      <img src={item.photos[0]} alt='' className='siImg' />
      <div className='siDesc'>
        <h1 className='siTitle'>{item.title}</h1>
        <span className='siDistance'>{item.distance}</span>
        <span className='siTaxiOp'>Free airport taxi</span>
        <span className='siSubtitle'>
          {'Studio Apartment with Air conditioning'}
        </span>
        <span className='siFeatures'>{item.features}</span>
        <span className='siCancelOp'>Free cancellation </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
        {item.ratings && (
          <div className='siRating'>
            <span>Excellent</span>
            <button>
              {item.ratings} <FaStar />{' '}
            </button>
          </div>
        )}
        <div className='siDetailTexts'>
          <span className='siPrice'>Rs:{item.price}</span>
          <span className='siTaxOp'>Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`} onClick={handleClick}>
            <button className='siCheckButton'>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
