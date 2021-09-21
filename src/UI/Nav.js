import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav' >
      <ul style={{  height: "100px",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  }}>
        <li>
          <NavLink to='/Home' exact activeClassName='active' style = {{marginRight:'10rem'}} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/Login' activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/Unanswered' activeClassName='active'>
            UnAnswered questions
          </NavLink>
        </li>
        <li>
          <NavLink to='/Answered' activeClassName='active'>
            Answered questions
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}