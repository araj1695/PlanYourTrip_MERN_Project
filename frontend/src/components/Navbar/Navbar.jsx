import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { FaUserAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {
  MdArrowDropDown,
  MdHome,
  MdSettingsSuggest,
  MdPlaylistAddCheckCircle,
  MdLiveHelp
} from 'react-icons/md'
import './navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    dispatch(reset())
  }, [user, navigate, dispatch])

  const onLogout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('dates')
    localStorage.removeItem('options')
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='text-light'>
      <nav
        className='navbar  navbar-expand-lg my-nav'
        // style={{
        //   background:
        //     '-webkit-linear-gradient(right, rgb(202, 202, 238), pink, rgb(139, 139, 245), rgb(135, 135, 240))',
        // }}
      >
        <div className='container-fluid container'>
          <div className="navimg"><img className='logo' alt='logo' src='./asset/logo.png' /></div>
          <Link style={{fontSize:"20px", fontWeight:"bold"}} className='navbar-brand' to='/'>
            PlanYourTrip
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'></ul>

            <form className='d-flex' role='search'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {user ? (
                  <>
                    <li
                      className='nav-item dropdown'
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <Link
                        className=''
                        // to='#'
                        style={{ textDecoration: 'none', color: 'black', cursor:"pointer" }}
                      >
                        <FaUser /> Welcome {user.name.split(' ')[0]}
                        <MdArrowDropDown
                          style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            color: 'black',
                          }}
                        />
                        {/* <FaUser />Hii, {user && JSON.parse(user).name.split(' ')[0]} */}
                      </Link>
                      {openMenu && (
                        <ul className='menu'>
                          <div className='userCircle'>
                            <div className='Ucircle'>
                              {user.name.split(' ')[0][0]}
                              {user.name.split(' ')[1][0]}
                            </div>
                          </div>
                          <li>
                            <Link className='' to='/userdetails'>
                              <FaUser className='logo-menu' />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className='' to='/'>
                              <MdHome className='logo-menu' />
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link className='' to='#'>
                              <MdLiveHelp className='logo-menu' />
                              Help
                            </Link>
                          </li>
                          <li>
                            <Link className='' to='#'>
                              <MdSettingsSuggest className='logo-menu' />
                              Settngs
                            </Link>
                          </li>
                          <li>
                            <Link className='' to='/bookings'>
                              <MdPlaylistAddCheckCircle className='logo-menu' />
                              Bookings
                            </Link>
                          </li>
                          <li className='' onClick={onLogout}>
                            <Link className='' to='/login'>
                              <FaSignOutAlt className='logo-menu' />
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/login'>
                        <FaUserAlt /> Signin
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
