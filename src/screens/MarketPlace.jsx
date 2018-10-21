import React, { Component } from 'react'
import axios from 'axios'
import { Grid } from 'semantic-ui-react'
import JobProfile from '../components/JobProfile.jsx'

const marketBaseUrl = 'https://blockgig.herokuapp.com'

class MarketPlace extends Component {
  constructor (props) {
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

  hire (i) {
    console.log('hire')
    axios
      .post(`${marketBaseUrl}/hire`, {
        username: this.props.username,
        business: this.state.marketPlace[i].username
      })
      .then(res => {
        this.props.history.push('/hired')
        // Success
      })
  }

  render () {
    const { marketPlace } = this.state
    const { username } = this.props
    return (
      <Grid columns={4}>
        <Grid.Row>
          {marketPlace.map((business, i) => (
            <Grid.Column key={i}>
              <JobProfile business={business} contact={() => this.hire(i)} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    )
  }
}

export default MarketPlace
