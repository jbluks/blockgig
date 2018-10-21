import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn, 
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut, } from 'blockstack'

class Header extends Component {
  render () {
    const { handleSignIn, handleSignOut } = this.props

    return (
      <div>

        <div>
          {!isUserSignedIn()
            ? <Signin handleSignIn={this.props.handleSignIn}/>
            : <Route
              path='/:username?'
              render={
                routeProps => <Profile handleSignOut={this.props.handleSignOut} {...routeProps} />
              }
            />
          }
        </div>
      </div>
    )
  }
}

export default Header
