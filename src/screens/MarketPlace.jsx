import React, { Component } from 'react'
import axios from 'axios'
import { Rating } from 'semantic-ui-react'
import JobProfile from '../components/JobProfile.jsx'


const marketBaseUrl = 'https://blockgig.herokuapp.com/'

class MarketPlace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marketPlace: []
    }
  }
  componentDidMount () {
    this.fetchData()
  }

  fetchData () {
    axios.get(`${marketBaseUrl}/market`).then(res => {
      this.setState({
        marketPlace: res.data
      })
    })
  }

  hire(i) {
    console.log('hire')
    axios.post(`${marketBaseUrl}/hire`, {
      username: this.props.username,
      business: this.state.marketPlace[i].username
    }).then(res => {
      this.props.history.push('/hired')
      // Success
    })
  }

  render () {
    const { marketPlace } = this.state
    const { username } = this.props
    return (
      <div>
        {marketPlace.map((business, i )=>
            <JobProfile key={i} business={business} contact={() => this.hire(i)} />
        )}
      </div>
    )
  }
}

export default MarketPlace