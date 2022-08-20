import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Form, FormLabel, Button } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { BsGoogle } from "react-icons/bs"
import "./Login.css"
import { loginUser, registerUser } from './Axios'



function Login({ context }) {
    const white = { color: "white" }
    const { login, setLogin, username, setUsername, password, setPassword, email, setEmail , setToken} = useContext(context)
    const navigate = useNavigate()
    const registrar = () => {
        setLogin(prev => !prev)
        setEmail("")
        setPassword("")
        setUsername("")
    }
    const valueUser = (e) => {
        setUsername(e.target.value)
    }
    const valueEmail = (e) => {
        setEmail(e.target.value)
    }
    const valuePassword = (e) => {
        setPassword(e.target.value)
    }
    const submit = async (e) => {
        e.preventDefault()
        const newUser = {
            userName: username,
            email,
            password
        }
        if (login) {
                const usuario = await loginUser(newUser)
                console.log(usuario)
                if(usuario.status==202){
                    setToken(usuario.data.token)
                    navigate('/cloud')
                }
        } else {
            const usuario = await registerUser(newUser)
            if(usuario.status===201){
                console.log("Usuario creado")
                registrar()
            }
        }
        setEmail("")
        setPassword("")
        setUsername("")
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
                    <h2 className='fw-bold text-center py-5' style={{ color: "#0d6efd" }}>{login ? "Bienvenidos" : "Crea una nueva cuenta"}</h2>
                    <Form action='#'>
                        <div className='mb-4'>
                            <FormLabel style={white}>Usuario</FormLabel>
                            <Form.Control placeholder="User Name" onChange={valueUser} value={username} />
                        </div>
                        {!login &&
                            <div className='mb-4'>
                                <FormLabel style={white}>Correo Electrónico</FormLabel>
                                <Form.Control type="email" placeholder="Email" onChange={valueEmail} value={email} />
                            </div>}
                        <div className='mb-4'>
                            <FormLabel style={white}>Contraseña</FormLabel>
                            <Form.Control type="password" placeholder="Password" onChange={valuePassword} value={password} />
                        </div>{login &&
                            <div className='mb-4'>
                                <Form.Check type="checkbox" label="Mantener sesión" style={white} />
                            </div>}
                        <div className='d-grid'>
                            <Button type='submit' variant="primary" onClick={submit}>{login ? "Login" : "Sign Up"}</Button>
                        </div>
                        <div className='my-3'>
                            <span style={white}>{login ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}<Link onClick={registrar} to="/" style={{ color: "#198754" }}>{login ? "Sign Up" : "Login"}</Link></span>
                            <br />{login &&
                                <span style={white}>¿Has olvidado la contraseña? <Link to="/" style={{ color: "#ffc107" }}>Recuperar Password</Link></span>
                            }
                        </div>
                    </Form>
                    <Container className='w-100 my-5'>
                        <Row>
                            <Col>{login &&
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