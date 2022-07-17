import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Form, FormLabel, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsGoogle } from "react-icons/bs"
import "./Login.css"


function Login({ context }) {
    const white = { color: "white" }
    const { register, setRegister } = useContext(context)
    const registrar = () => { setRegister(prev => !prev) }
    const login = ()=>{
        
    }
    return (
        <Container className='w-75 rounded shadow mt-3'>
            <Row className="align-items-stretch">
                <Col className="bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
                </Col>
                <Col className='p-5 rounded-end'>
                    <div className='text-end'>
                        <img src="/public/logo.png" width="48" alt="" />
                    </div>
                    <h2 className='fw-bold text-center py-5' style={{ color: "#0d6efd" }}>{register ? "Bienvenidos" : "Crea una nueva cuenta"}</h2>
                    <Form action='#'>
                        <div className='mb-4'>
                            <FormLabel style={white}>Usuario</FormLabel>
                            <Form.Control placeholder="User Name" />
                        </div>
                        {!register &&
                            <div className='mb-4'>
                                <FormLabel style={white}>Correo Electrónico</FormLabel>
                                <Form.Control type="email" placeholder="Email" />
                            </div>}
                        <div className='mb-4'>
                            <FormLabel style={white}>Contraseña</FormLabel>
                            <Form.Control type="password" placeholder="Password" />
                        </div>{register &&
                            <div className='mb-4'>
                                <Form.Check type="checkbox" label="Mantener sesión" style={white} />
                            </div>}
                        <div className='d-grid'>
                            <Button variant="primary" onClick={login}>{register ? "Login" : "Sign Up"}</Button>
                        </div>
                        <div className='my-3'>
                            <span style={white}>{register ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}<Link onClick={registrar} to="/" style={{ color: "#198754" }}>{register ? "Sign Up" : "Login"}</Link></span>
                            <br />{register &&
                                <span style={white}>¿Has olvidado la contraseña? <Link to="/" style={{ color: "#ffc107" }}>Recuperar Password</Link></span>
                            }
                        </div>
                    </Form>
                    <Container className='w-100 my-5'>
                        <Row>
                            <Col>{register &&
                                <Button variant="outline-danger" className="w-100 my-1 text-center">
                                    <BsGoogle style={{ verticalAlign: "middle" }} /> Login with Google
                                </Button>
                            }
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Login