import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  isUserSignedIn
} from 'blockstack'

class Header extends Component {
  render() {
    return (
      <div>
        <div>BlogGig</div>
        <div><Link to="/marketplace">MarketPlace</Link></div>
        <div><Link to="/profile">Profile</Link></div>
        <div>
        {!isUserSignedIn() ? 'Login' : 'Logout' }</div>
      </div>
    )
  }
}

export default Header