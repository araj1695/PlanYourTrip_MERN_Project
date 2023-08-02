import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllHotels, reset } from '../../features/hotels/hotelSlice'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import Spinner from '../../components/Spinner/Spinner'
import SearchItem from '../../components/SearchItem/SearchItem'
import './hotels.css'

const Hotels = (props) => {
  
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState(location.state ? location.state.dates : [{startDate: new Date(), endDate: new Date()}])
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state ?  location.state.options : {adult:0, room:0, children:0})

  const { hotels, isLoading, isError, message } = useSelector(
    (state) => state.hotels
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAllHotels())

    return () => {
      dispatch(reset())
    }
  }, [ isError, message, dispatch])

  const handleClick = () => {}

  const filtered = hotels.filter(h => {
    return h.city.toLowerCase().startsWith(destination.toLowerCase()) || h.title.toLowerCase().startsWith(destination.toLowerCase())
  })



  return (
    <div>
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle' style={{textAlign:"center"}}>Search</h1>
            <div className='lsItem'>
              <label>Destination or hotel</label>
              <input
                placeholder={location.state && location.state.destination}
                onChange={(e) => setDestination(e.target.value)}
                type='text'
              />
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className='lsItem'>
              {/* <label>Options</label> */}
              <div className='lsOptions'>
                {/* <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options && options.adult}
                    onChange={(e) => setOptions({adult: e.target.value})}
                    value={options.adult}
                  />
                </div> */}
                {/* <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    placeholder={options && options.children}
                    onChange={(e) => setOptions({children: e.target.value})}
                    value={options.children}
                  />
                </div> */}
                {/* <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    onChange={(e) => setOptions({room: e.target.value})}
                    placeholder={options && options.room}
                    value={options.room}
                  />
                </div> */}
              </div>
            </div>
            {/* <button onClick={handleClick}>Search</button> */}
          </div>
          <div className='listResult'>
            {isLoading ? (
              <Spinner/>
            ) : (
              <>
                {filtered && filtered.map((item) => (
                  <SearchItem item={item} dates={dates} options={options}  key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels
