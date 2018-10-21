import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isUserSignedIn } from 'blockstack'

class Header extends Component {
  render () {
    const { handleSignIn, handleSignOut } = this.props
    return (
      <div>
        <div>BlockGig</div>
        <div><Link to='/market'>MarketPlace</Link></div>
        <div><Link to='/profile'>Profile</Link></div>
        <div>
          {!isUserSignedIn() ? <a href="#" onClick={handleSignIn}>Login</a> : <a href="#" onClick={handleSignOut}>Logout</a>}
        </div>
      </div>
    )
  }
}

export default Header
