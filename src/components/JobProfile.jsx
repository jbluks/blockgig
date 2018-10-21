import React, { Component } from 'react'
import { Card, Button, Icon, Rating } from 'semantic-ui-react'

class JobProfile extends Component {
  render () {
    const { business } = this.props
    console.log(this.props)
    return (
      <div>
        <Card className='card'>
          <Card.Content className='card'>
            <Card.Header className='cardHeader'>{business.user}</Card.Header>
            <Card.Header className='cardHeader'>
              {business.businessName}
            </Card.Header>
            <Card.Header className='cardHeader'>Description</Card.Header>
            <Card.Description>
              {business.description}
            </Card.Description>
            <Card.Header className='cardHeader'>Skills</Card.Header>
            <Card.Description>
              <ul className='skills-list'>
                {business.skills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
              <Button className='contactButton' onClick={this.props.contact}>
                Contact {business.user}
              </Button>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>
              <Rating icon='star' defaultRating={4} maxRating={5} />
            </Card.Meta>
            <Card.Meta>Last Active: {new Date().toDateString()}</Card.Meta>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default JobProfile
