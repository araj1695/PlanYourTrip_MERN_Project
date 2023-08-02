import React from 'react'
import { useSelector } from 'react-redux'
import './UserDetails.css'

const UserDetails = () => {
  const { user } = useSelector((state) => state.auth)
  // console.log(user)

  return (
    <div className='outter'>
      <div className='container text-center'>
        <h1>User Page</h1>
        {user ? (
          <>
            <p>
              Name: <b>{user.name}</b>
            </p>
            <p>
              Email: <b>{user.email}</b>
            </p>
          </>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  )
}

export default UserDetails
