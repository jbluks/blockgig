import React, { Component } from 'react'
import { Grid, Card } from 'semantic-ui-react'

class Home extends Component {
  render () {
    return (
      <div>
        <h1>BlockGig - A Blockchain MarketPlace!</h1>
        <h2>This is a work in progress.</h2>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content header='Share Your Skills' />
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content header='Run Your Own Business' />
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content header='Sign Up for BlockGig' />
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Home
