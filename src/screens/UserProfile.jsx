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

const businessFileName = 'business.json'
const apiUrl = `http://localhost:8081/market`
class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      business: {}
    }
    this.saveBusiness = this.saveBusiness.bind(this)
  }

  saveData(business) {
    axios.post(apiUrl, {
      business
    }).then(err => {
      //Error
    })
  }

  saveBusiness(e) {
    e.preventDefault()

    const business = {
      name: this.business.businessName.value,
      skills: this.business.skills.value.split(',')
    }

    const options = { encrypt: false }
    putFile(businessFileName, JSON.stringify(business), options)
      .then(() => {
        this.setState({
          business
        }, () => {
          this.saveData(business)
        })
      })
  }
  render() {
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