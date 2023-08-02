import React from 'react'
import './Packages.css'
import { Link } from 'react-router-dom'

function Packages() {
  return (
    <div>
    <section className='packages container' id='packages'>
      <div className='box-container'>
        <div className='box'>
          <img src='asset/taj.jpg' alt='' />
          <div className='content'>
            <h3>
              <i className='fas fa-map-marker-alt' /> mumbai
            </h3>
            <p>
              Visit the classic city of india and financial capital of india
            </p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              $90.00 <span>$120.00</span>
            </div>
            <Link to='#' className='btn'>
              book now
            </Link>
          </div>
        </div>
        <div className='box'>
          <img src='asset/victoria.jpg' alt='' />
          <div className='content'>
            <h3>
              {' '}
              <i className='fas fa-map-marker-alt' /> Kolkata{' '}
            </h3>
            <p>City of joy and most iconic city</p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              {' '}
              $90.00 <span>$120.00</span>{' '}
            </div>
            <a href='#' className='btn'>
              book now
            </a>
          </div>
        </div>
        <div className='box'>
          <img src='asset/nalanda.jpg' alt='' />
          <div className='content'>
            <h3>
              {' '}
              <i className='fas fa-map-marker-alt' /> NALANDA{' '}
            </h3>
            <p>Oldest library</p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              {' '}
              $90.00 <span>$120.00</span>{' '}
            </div>
            <a href='#' className='btn'>
              book now
            </a>
          </div>
        </div>
        <div className='box'>
          <img src='asset/parliament.jpg' alt='' />
          <div className='content'>
            <h3>
              {' '}
              <i className='fas fa-map-marker-alt' /> Delhi{' '}
            </h3>
            <p>visit the capital city of India</p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              {' '}
              $90.00 <span>$120.00</span>{' '}
            </div>
            <a href='#' className='btn'>
              book now
            </a>
          </div>
        </div>
        <div className='box'>
          <img src='asset/uttarakhand.jpg' alt='' />
          <div className='content'>
            <h3>
              {' '}
              <i className='fas fa-map-marker-alt' /> Uttarakhand{' '}
            </h3>
            <p>Enjoy the nature</p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              {' '}
              $90.00 <span>$120.00</span>{' '}
            </div>
            <a href='#' className='btn'>
              book now
            </a>
          </div>
        </div>
        <div className='box'>
          <img src='asset/assam.jpg' alt='' />
          <div className='content'>
            <h3>
              {' '}
              <i className='fas fa-map-marker-alt' />
              Assam{' '}
            </h3>
            <p>assam india's iconic natural place</p>
            <div className='stars'>
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='fas fa-star' />
              <i className='far fa-star' />
            </div>
            <div className='price'>
              {' '}
              $90.00 <span>$120.00</span>{' '}
            </div>
            <a href='#' className='btn'>
              book now
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Packages