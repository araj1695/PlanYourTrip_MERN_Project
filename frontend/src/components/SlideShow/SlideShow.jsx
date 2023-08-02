import React, { useState } from 'react'
import './SlideShow.css'

function Slideshow() {

    const [currSlideNumber, setCurrSlideNumber] = useState(0)

    const SlideData = [
        {
            "id": 1,
            "src": "asset/Slide1.jpg",
            "caption": "MY LONAVALA TRIP: SUGGESTIONS, RECOMMENDATIONS AND TIPS"
        },
        {
            "id": 2,
            "src": "asset/Slide2.jpg",
            "caption": "REJUVENATING YOGA RETREAT IN RISHIKESH FOR THE SERENITY SEEKERS"
        },
        {
            "id": 3,
            "src": "asset/Slide3.jpg",
            "caption": "TOP 10 PLACES TO VISIT ON YOUR KASOL TRIP: A JOURNEY THROUGH THE HEART OF HIMALAYAS"
        },
        {
            "id": 4,
            "src": "asset/Slide4.jpg",
            "caption": "FROM BLOSSOM TO HARVEST: THE STORY OF APPLE ORCHARDS IN INDIA"
        },
        {
            "id": 5,
            "src": "asset/Slide5.jpg",
            "caption": "10 MOST SPECTACULAR LAKES IN INDIA TO EXPLORE NOW!"
        },
        {
            "id": 6,
            "src": "asset/Slide6.jpg",
            "caption": "Kedarnath Temple: A Symbol Of Devotion & Cultural Heritage"
        },
        {
            "id": 7,
            "src": "asset/Slide7.jpg",
            "caption": "Explore Badrinath’s Mystical Beauty: Come On A Spiritual Journey With Us"
        },
        {
            "id": 8,
            "src": "asset/Slide8.jpg",
            "caption": "9 Things To Do On Your Weekend Getaway To The Sunderbans"
        },
        {
            "id": 9,
            "src": "asset/Slide9.jpg",
            "caption": "Experience The Serenity Of 9 Beautiful Hill Stations in The Western Ghats"
        },
        {
            "id": 10,
            "src": "asset/Slide10.jpg",
            "caption": "Nainital Tour Itinerary: A 7-Day Adventure In The Serene Hill Station"
        },

    ]

    const prevClicked = () => {
        if(currSlideNumber === 0){
            setCurrSlideNumber(SlideData.length -1)
        }else{
            let c = currSlideNumber
            setCurrSlideNumber(c-1)
        }
    }

    const nextClicked = () => {
        if(currSlideNumber === SlideData.length-1){
            setCurrSlideNumber(0)
        }else{
            let c = currSlideNumber
            setCurrSlideNumber(c+1)
        }
    }

    



  return (
    <div>
      <div className='slideshow'>
        <div className='slideshow-container'>
          <div className='mySlides'>
            <img src={SlideData[currSlideNumber].src}  />
            <div className='text'>
                <h1>{SlideData[currSlideNumber].caption}</h1>
            </div>
          </div>

          <p className='prev' onClick={prevClicked}>
          ❮
          </p>
          <p className='next' onClick={nextClicked}>
            ❯
          </p>
        </div>
        <div className='dot-container'>
          {
            SlideData.map((e,i) => (
                <span className={i===currSlideNumber ? 'dot active' : 'dot'} onClick={()=>setCurrSlideNumber(i)
            } ></span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Slideshow
