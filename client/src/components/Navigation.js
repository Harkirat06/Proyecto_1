import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Container, Nav, Button} from 'react-bootstrap'
import { useNavigate , Link} from 'react-router-dom'

export default function Navigation({context}) {
  const navigate = useNavigate()
  const {setToken} = useContext(context)
  const onClick = ()=>{
    localStorage.removeItem("token")
    setToken(null)
    navigate("/")
  }
  return (
    <Navbar bg="dark" sticky="top" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Uploader</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link><Button variant='outline-danger' onClick={onClick}>Log Out</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

