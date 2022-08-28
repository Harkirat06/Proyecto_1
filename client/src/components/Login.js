import React, { useContext, useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Form, FormLabel, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { loginUser, registerUser } from './Axios'
import jwt_decode from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google'

function Login({ context }) {
    const white = { color: "white" }
    const { login, setLogin, username, setUsername, password, setPassword,
        email, setEmail, setToken, token } = useContext(context)

    const [remind, setRemind] = useState(false)
    const navigate = useNavigate()


    const onGoogleSignIn = async (res) => {
        let userCred = res.credential
        console.log(userCred)
        let payload = jwt_decode(userCred)
        const newUser = {
            userName: payload.name,
            email: payload.email,
            password: "",
            google: true,
            remind
        }
        let usuario = await registerUser(newUser)
        if (usuario.status === 201) {
            console.log("Usuario creado")
            usuario = await loginUser(newUser)
            const t = usuario.data.token
            setToken(t)
            localStorage.setItem("token", t)
            navigate('/cloud')
        } else {
            usuario = await loginUser(newUser)
            const t = usuario.data.token
            setToken(t)
            localStorage.setItem("token", t)
            navigate('/cloud')
        }
    }
    
    useEffect(() => {
        if (token !== undefined && token != null) {
            navigate("/cloud")
        }
    }, [])

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
    const handleOnChange = () => {
        setRemind(!remind)
        console.log(remind)
    }
    const submit = async (e) => {
        e.preventDefault()
        const newUser = {
            userName: username,
            email,
            password,
            google: false,
            remind
        }
        if (login) {
            const usuario = await loginUser(newUser)
            console.log(usuario)
            if (usuario.status == 202) {
                const t = usuario.data.token
                setToken(t)
                localStorage.setItem("token", t)
                console.log(remind)
                navigate('/cloud')
            }
        } else {
            const usuario = await registerUser(newUser)
            if (usuario.status === 201) {
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
                                <Form.Check type="checkbox" label="Mantener sesión" style={white} onChange={handleOnChange} />
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
                    <GoogleLogin
                        onSuccess={onGoogleSignIn}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                        auto_select
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Login