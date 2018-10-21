import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Card, Icon, Grid, Container } from 'semantic-ui-react'
import Profile from './Profile.jsx'
import UserProfile from '../screens/UserProfile.jsx'
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
import About from '../screens/About.jsx'
import MarketPlace from '../screens/MarketPlace.jsx'
import Home from '../screens/Home.jsx'

const businessFileName = 'business.json'
const avatarFallbackImage =
  'https://s3.amazonaws.com/onename/avatar-placeholder.png'
const apiUrl = `https://blockgig.herokuapp.com/market`

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
      transactions: [],
      isLoading: false
    }
    this.saveBusiness = this.saveBusiness.bind(this)
    this.handleBusinessDelete = this.handleBusinessDelete.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  handleBusinessDelete() {
    console.log('fired')
    console.log(this.state.business)
    const business = Object.assign(this.state.business, {
      businessName: null,
      skills: null,
      username: loadUserData().username || this.props.match.params.username,
    })
    this.setState({
      business
    })
    console.log(this.state.business)
  }

  fetchData () {
    this.setState({ isLoading: true })
    // if (this.isLocal()) {
    const options = { decrypt: false }
    getFile(businessFileName, options)
      .then(file => {
        var business = JSON.parse(file || '{}')
        const person = new Person(loadUserData().profile)
        this.setState(
          {
            person,
            username: loadUserData().username,
            business
          },
          () => {
            if (this.state.business !== {}) {
              axios.get(`${apiUrl}/hire/${this.state.username}`).then(res => {
                this.setState({
                  transactions: res.data
                })
              })
            }
          }
        )
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
          <Container>
            <Switch>
              <Route path='/' exact component={Home} />
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
                    username={this.state.username}
                    business={this.state.business}
                    transactions={this.state.transactions}
                    handleBusinessDelete={this.handleBusinessDelete}
                  />
                )}
              />
              <Route path='/hired' render={props => <div>Success! You will be contacted shortly!</div>} />
              <Route path='/about' component={About} />
            </Switch>
          </Container>
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
