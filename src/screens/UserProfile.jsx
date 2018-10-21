import React, { Component } from 'react'
import axios from 'axios'
import {
  Menu, Header, Form, Container
} from 'semantic-ui-react'
import {
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from 'blockstack'

class UserProfile extends Component {
  saveBusiness(e) {
    e.preventDefault()

    const business = {
      username: loadUserData().username || this.props.match.params.username,
      name: this.business.businessName.value,
      skills: this.business.skills.value.split(',')
    }

    this.props.saveBusiness(business)
  }
  render() {
    const { business } = this.props.business
    console.log(business)
    return (
      <div>
        UserProfile
        <div>
          <form ref={self => this.business = self} onSubmit={this.saveBusiness}>
          
            Business Name: <input type="text" name="businessName" />
          
            Skill: <input type="text" name="skills" /> <br/>
          
            <button>Add Business</button>
          </form>
        </div>
      </div>
    )
  }
}

export default UserProfile