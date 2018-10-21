import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu, Header, Form, Container
} from 'semantic-ui-react'
import {
  isUserSignedIn,

} from 'blockstack'


export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    };
  }

  render() {

    const { activeItem } = this.state

    const styles = {
       vertCenter: {
        margin: 25,
        marginLeft: 10
      }
    }

    return (

      <div className="navBar">


        <Menu style={styles.index} className="ui stackable menu">
          <Menu.Item style={styles.paddingElim} position='left'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link} to='/'
          >
            

            <Header as="h1" style={styles.vertCenter}><strong>BlockGig</strong></Header>
          </Menu.Item>


          <Menu.Menu position='right'>
            <Menu.Item
              name='marketplace'
              active={activeItem === 'marketplace'}
              onClick={this.handleItemClick}
              as={Link} to='/marketplace'
            >
              <Header as="h3" style={styles.vertCenter}><strong>Marketplace</strong></Header>
        </Menu.Item>

            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link} to='/profile'
            >
              <Header as="h3" style={styles.vertCenter}><strong>Profile</strong></Header>
        </Menu.Item>

            <Menu.Item
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
              as={Link} to='/about'
            >
              <Header as="h3" style={styles.vertCenter}><strong>About</strong></Header>
        </Menu.Item>
            
            {isUserSignedIn() && 
            <Menu.Item
              name='signout'
              active={activeItem === 'about'}
              onClick={this.props.handleSignOut}
              as={Link} to='/about'
            >
              <Header as="h3" style={styles.vertCenter}><strong>Signout</strong></Header>
            </Menu.Item>
            }

          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}


