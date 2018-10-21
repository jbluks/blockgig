import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from './Profile.jsx'
import UserProfile from '../screens/UserProfile.jsx'
import Signin from './Signin.jsx'
import Nav from './Nav.jsx'
import axios from 'axios'
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from 'blockstack'
import Header from './Header.jsx'
import About from '../screens/About.jsx'
import MarketPlace from '../screens/MarketPlace.jsx'

const businessFileName = 'business.json'
const avatarFallbackImage =
  'https://s3.amazonaws.com/onename/avatar-placeholder.png'
const apiUrl = `http://localhost:8081/market`

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      person: {
        name () {
          return 'Anonymous'
        },
        avatarUrl () {
          return avatarFallbackImage
        }
      },
      username: '',
      business: {},
      isLoading: false
    }
    this.saveBusiness = this.saveBusiness.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData () {
    this.setState({ isLoading: true })
    // if (this.isLocal()) {
    const options = { decrypt: false }
    getFile(businessFileName, options)
      .then(file => {
        var business = JSON.parse(file || '{}')
        const person = new Person(loadUserData().profile)
        console.log(loadUserData().username)
        this.setState({
          person,
          username: loadUserData().username,
          business
        })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
    // } else {
    //   const username = this.props.match.params.username
    //   lookupProfile(username)
    //     .then(profile => {
    //       console.log(username)
    //       this.setState({
    //         person: new Person(profile),
    //         username: username
    //       })
    //     })
    //     .catch(error => {
    //       console.log('could not resolve profile')
    //     })

    //   const options = { username: username, decrypt: false }
    //   getFile(businessFileName, options)
    //     .then(file => {
    //       var business = JSON.parse(file || '{}')
    //       this.setState({
    //         business
    //       })
    //     })
    //     .catch(error => {
    //       console.log('could not fetch business')
    //     })
    //     .finally(() => {
    //       this.setState({ isLoading: false })
    //     })
    // }
  }

  // isLocal () {
  //   return !this.props.match.params.username
  // }

  handleSignIn (e) {
    e.preventDefault()
    redirectToSignIn()
  }

  handleSignOut (e) {
    e.preventDefault()
    signUserOut(window.location.origin)
  }

  saveData (business) {
    axios
      .post(apiUrl, {
        business
      })
      .then(err => {
        // Error
      })
  }

  saveBusiness (business) {
    const options = { encrypt: false }
    putFile(businessFileName, JSON.stringify(business), options).then(() => {
      this.setState(
        {
          business
        },
        () => {
          this.saveData(business)
        }
      )
    })
  }

  render () {
    console.log(this.state)
    return (
      <div className='site-wrapper'>
        <div className='site-wrapper-inner'>
          <Nav
            handleSignOut={this.handleSignOut}
            handleSignIn={this.handleSignIn}
          />
          <div className='header'>
            <Header
              handleSignIn={this.handleSignIn}
              handleSignOut={this.handleSignOut}
              render={routeProps => (
                <Profile handleSignOut={this.handleSignOut} {...routeProps} />
              )}
            />
          </div>
          <Switch>
            <Route
              path='/marketplace'
              render={routeProps => (
                <MarketPlace username={this.state.username} {...routeProps} />
              )}
            />
            <Route
              path='/profile'
              render={routeProps => (
                <UserProfile
                  {...routeProps}
                  saveBusiness={this.saveBusiness}
                  person={this.state.person}
                  username={this.state.user}
                  business={this.state.business}
                />
              )}
            />
            <Route path='/about' component={About} />
          </Switch>
        </div>
      </div>
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
