import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Checkbox, Grid } from 'semantic-ui-react'
import {
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from 'blockstack'

class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      business: {
        user: props.person.name(),
        username: props.username
      }
    }
    this.saveBusiness = this.saveBusiness.bind(this)
  }

  saveBusiness (e) {
    e.preventDefault()
    this.props.saveBusiness(this.state.business)
  }

  updateInput (e) {
    let name = e.target.id
    const business = Object.assign(this.state.business, {
      [name]: e.target.value
    })
    this.setState({
      business
    })
  }

  render () {
    const { business, transactions } = this.props
    console.log(transactions)
    return (
      <div>
        <p>Name: {this.props.person.name()}</p>
        <p>Username: {this.props.username}</p>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              {!this.props.business.businessName
                ? <div>
                  <h1>Add Business</h1>
                  <div className='businessSubmit'>
                    <Form onSubmit={this.saveBusiness}>

                      <Form.Input
                        onChange={e => this.updateInput(e)}
                        type='text'
                        placeholder='Business Name'
                        name='businessName'
                        id='businessName'
                        />

                      <Form.Input
                        onChange={e => this.updateInput(e)}
                        type='text'
                        placeholder='Description'
                        name='description'
                        id='description'
                        />

                      <Form.Input
                        onChange={e => this.updateInput(e)}
                        type='text'
                        placeholder='Skills'
                        name='skills'
                        id='skills'
                        />

                      <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                      </Form.Field>
                      <Button type='submit'>Submit</Button>
                    </Form>
                  </div>
                </div>
                : <div>
                  <p>Business name: {this.props.business.businessName}</p>
                  <p>Skill: {this.props.business.skills}</p>
                  <Button onClick={() => this.props.handleBusinessDelete()}>
                      Update
                    </Button>
                </div>}
            </Grid.Column>
            <Grid.Column>
              <h2>Customer Queue</h2>
              {transactions.length === 0
                ? <div>No New customers</div>
                : <ul>
                  {transactions.map((transaction, i) => (
                    <li key={i}><a href={`/${transaction.username}`}>{transaction.username}</a> {transaction.date}</li>
                    ))}
                </ul>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default UserProfile
