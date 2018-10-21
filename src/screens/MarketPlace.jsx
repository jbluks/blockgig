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

  render () {
    const { marketPlace } = this.state
    return (
      <div>
        {marketPlace.map((business, i )=> {
          return (
            <div key={i}>
              <div>{ business.name }</div>
              <div>Skills: {business.skills.join(', ')}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MarketPlace
