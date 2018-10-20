import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './Profile.jsx'
import UserProfile from '../screens/UserProfile.jsx'
import Signin from './Signin.jsx'
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut
} from 'blockstack'
import Dashboard from '../screens/Dashboard.jsx'
import Header from './Header.jsx'
import MarketPlace from '../screens/MarketPlace.jsx'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  handleSignIn (e) {
    e.preventDefault()
    redirectToSignIn()
  }

  handleSignOut (e) {
    e.preventDefault()
    signUserOut(window.location.origin)
  }

  render () {
    return (
      <Router>
        <div className='site-wrapper'>
          <div className='site-wrapper-inner'>
            <Header />
            <Switch>
              <Route path="/market" component={MarketPlace} />
              <Route path="/profile" component={UserProfile} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  componentWillMount () {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin
      })
    }
  }
}
