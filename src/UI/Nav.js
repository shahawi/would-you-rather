import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav' >
      <ul style={{ display: "flex", flexDirection: "row" ,justifycontent: 'space-between',marginLeft: '10rem'}}>
        <li>
          <NavLink to='/' exact activeClassName='active' style = {{marginRight:'10rem'}} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/Login' activeClassName='active'>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}