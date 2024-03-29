import React, { useState } from 'react'
import './Home.css'
import {
  faBed,
  faCalendarDays,
  faPerson,
  faPlane,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { DateRange } from 'react-date-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import SlideShow from '../../components/SlideShow/SlideShow'
import Packages from '../../components/Packages/Packages'


function Home() {
  const { user } = useSelector((state) => state.auth)
  const [destination, setDestination] = useState('')
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const navigate = useNavigate()

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const handleSearch = () => {
    // localStorage.setItem('state', JSON.stringify([{destination, dates, options}]))
    navigate('/hotels', { state: { destination, dates, options } })
  }

  return (
    <div className='home-outter'>
      <Header />
      <section>
        <div className='headerSearch'>
          <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faBed} className='headerIcon' />
            <input
              type='text'
              placeholder='Where are you going?'
              className='headerSearchInput'
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
            <span
              onClick={() => setOpenDate(!openDate)}
              className='headerSearchText'
            >{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
              dates[0].endDate,
              'dd/MM/yyyy'
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className='date'
                minDate={new Date()}
              />
            )}
          </div>
          <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className='headerSearchText'
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className='options'>
                <div className='optionItem'>
                  <span className='optionText'>Adult</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.adult <= 1}
                      className='optionCounterButton'
                      onClick={() => handleOption('adult', 'd')}
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button
                      className='optionCounterButton'
                      onClick={() => handleOption('adult', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Children</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.children <= 0}
                      className='optionCounterButton'
                      onClick={() => handleOption('children', 'd')}
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>
                      {options.children}
                    </span>
                    <button
                      className='optionCounterButton'
                      onClick={() => handleOption('children', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Room</span>
                  <div className='optionCounter'>
                    <button
                      disabled={options.room <= 1}
                      className='optionCounterButton'
                      onClick={() => handleOption('room', 'd')}
                    >
                      -
                    </button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button
                      className='optionCounterButton'
                      onClick={() => handleOption('room', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='headerSearchItem btn-container'>
            <button
              disabled={destination === ''}
              className='headerBtn'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <SlideShow />

      {/* <Packages/> */}
      
    </div>
  )
}

export default Home
