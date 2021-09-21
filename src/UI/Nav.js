import React from 'react'
import { NavLink } from 'react-router-dom'
import "../nav.css"
export default function Nav () {
  return (
    <nav className='nav' >
      <ul >
        <li>
          <NavLink to='/Home' exact activeClassName='active'  >
            Home
          </NavLink>
        </li>
         <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
         </li> 
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li> 
    
      </ul>
    </nav>
  )
}