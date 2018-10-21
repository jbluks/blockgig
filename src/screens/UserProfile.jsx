import React, { Component } from 'react'
import axios from 'axios'
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
  }

  saveData(business) {
    axios.post(apiUrl, {
      business
    }).then(err => {
      //Error
    })
  }

  saveBusiness() {
    let business = {}

    // Create Business object from the form object of add business


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
    return <div>UserProfile</div>
  }
}

export default UserProfile