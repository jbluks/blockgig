import React, { Component } from 'react'
import axios from 'axios'
import {
  Form, Button, Checkbox
} from 'semantic-ui-react'
import {
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from 'blockstack'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      business: {}
    }
    this.saveBusiness = this.saveBusiness.bind(this)
  }

  saveBusiness(e) {
    e.preventDefault()
    this.props.saveBusiness(this.state.business)
  }

  updateInput(e) {
    let name = e.target.id
    const business = Object.assign(this.state.business, {
      [name]: e.target.value,
      username: loadUserData().username || this.props.match.params.username,
    })
    this.setState({
      business
    })
  }

  render() {
    const { business, transactions } = this.props
    return (
      <div>
      <h1>Add Business</h1>
      <div className='businessSubmit'>
        <Form onSubmit={this.saveBusiness} >


          <Form.Input
            onChange={e => this.updateInput(e)}
            type="text"
            placeholder="Business Name"
            name="businessName"
            id="businessName"
          />

          <Form.Input

            onChange={e => this.updateInput(e)}
            type="text"
            placeholder='Skills'
            name="skills"
            id="skills"
          />

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit' >Submit</Button>
        </Form>
      </div>
      </div>
    )
  }
}

export default UserProfile