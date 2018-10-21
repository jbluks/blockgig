import React, { Component } from 'react'
import axios from 'axios'

const marketBaseUrl = 'http://localhost:8081'

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
    axios.post(`${marketBaseUrl}/hire`, {
      username: this.props.username,
      business: this.state.marketPlace[i].username
    }).then(res => {
      // Success
    })
  }

  render () {
    const { marketPlace } = this.state
    const { username } = this.props
    return (
      <div>
        {marketPlace.map((business, i )=> {
          return (
            <div key={i}>
              <div>{ business.name }</div>
              <div>Skills: {business.skills.join(', ')}</div>
              <a href="#" onClick={() => this.hire(i)}>Hire Me</a>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MarketPlace
