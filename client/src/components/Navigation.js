import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Container, NavDropdown, Nav, Button} from 'react-bootstrap'
import {Link} from "react-router-dom"

export default function Navigation() {
  return (
    <Navbar bg="dark" sticky="top" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Uploader</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/"><Button variant='outline-danger'>Log Out</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

