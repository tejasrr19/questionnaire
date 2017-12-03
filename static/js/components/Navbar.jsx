import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from '../../public/img/tesla-logo.png';

export default class TNavbar extends React.Component {
  render() {
    return(
      <Navbar className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <img style={{heigth: 70, width: 200}} src={ logo } />
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>Tesla Questionnaire</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
