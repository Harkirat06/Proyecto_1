import React, { useContext, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Form, FormLabel, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { loginUser, registerUser } from './Axios'
import jwt_decode from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google'
import { useForm } from "react-hook-form"
import {FiAlertTriangle} from "react-icons/fi"

function Login({ context }) {
    const white = { color: "white" }
    const red = {color: "#dc3545" }
    const messages = {
        req: "Este campo es obligatorio",
        mail: "Debes introducir una dirección correcta",
        password: "Debes introducir una contraseña con al menos 8 caracteres con digitos, con un caracter en minúscula y mayúscula y un caracter especial"
    }
    const patterns = {
        mail: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    }
    const { login, setLogin, setToken, token } = useContext(context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ mode: "onTouched" })
    console.log(errors)
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
            google: true
        }
        let usuario = await registerUser(newUser)
        if (usuario.status === 201) {
            console.log("Usuario creado")
            usuario = await loginUser(newUser)
            const t = usuario.data.token
            setToken(t)
            localStorage.setItem("token", t)
            localStorage.setItem("remind", remind)
            navigate('/cloud')
        } else {
            usuario = await loginUser(newUser)
            const t = usuario.data.token
            setToken(t)
            localStorage.setItem("token", t)
            localStorage.setItem("remind", remind)
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
    }
    const handleOnChange = (e) => {
        setRemind(e.target.checked)
        console.log(remind)
    }

    const onLogin = async (userInfo) => {
        const newUser = {
            userName: userInfo.name,
            email: "",
            password: userInfo.password,
            google: false
        }
        const usuario = await loginUser(newUser)
        console.log(usuario)
        if (usuario.status === 202) {
            const t = usuario.data.token
            setToken(t)
            localStorage.setItem("token", t)
            localStorage.setItem("remind", userInfo.remind)
            console.log(userInfo.remind)
            navigate('/cloud')
        }

    }

    const onRegister = async (userInfo) => {
        const newUser = {
            userName: userInfo.nameRegister,
            email: userInfo.emailRegister,
            password: userInfo.passwordRegister,
            google: false
        }
        const usuario = await registerUser(newUser)
        if (usuario.status === 201) {
            console.log("Usuario creado")
            registrar()
        }
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
                    {login
                        ?
                        <Form onSubmit={handleSubmit(onLogin)}>
                            <div className='mb-4'>
                                <FormLabel style={white}>Usuario</FormLabel>
                                <Form.Control {...register("name", { required: messages.req })} type="text" placeholder="User Name" />
                                {errors.name && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.name.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='mb-4'>
                                <FormLabel style={white}>Contraseña</FormLabel>
                                <Form.Control {...register("password", {
                                     required: messages.req,
                                     pattern: {
                                        value: patterns.password,
                                        message: messages.password
                                      }

                                })} type="password" placeholder="Password" />
                                {errors.password && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.password.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='mb-4'>
                                <Form.Check {...register("remind")} onChange={handleOnChange} type="checkbox" label="Mantener sesión" style={white} />
                            </div>
                            <div className='d-grid'>
                                <Button type='submit' variant="primary">Login</Button>
                            </div>
                            <div className='my-3'>
                                <span style={white}>¿No tienes cuenta? <Link onClick={registrar} to="/" style={{ color: "#198754" }}>Sign Up</Link></span>
                                <br />
                                <span style={white}>¿Has olvidado la contraseña? <Link to="/" style={{ color: "#ffc107" }}>Recuperar Password</Link></span>
                            </div>
                        </Form>
                        :
                        <Form onSubmit={handleSubmit(onRegister)}>
                            <div className='mb-4'>
                                <FormLabel style={white}>Usuario</FormLabel>
                                <Form.Control {...register("nameRegister", { required: messages.req })} type="text" placeholder="User Name" />
                                {errors.nameRegister && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.nameRegister.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='mb-4'>
                                <FormLabel style={white}>Contraseña</FormLabel>
                                <Form.Control {...register("passwordRegister", {
                                     required: messages.req,
                                     pattern: {
                                        value: patterns.password,
                                        message: messages.password
                                      }
                                      })} type="password" placeholder="Password" />
                                {errors.passwordRegister && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.passwordRegister.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='mb-4'>
                                <FormLabel style={white}>Repetir Contraseña</FormLabel>
                                <Form.Control
                                 {...register("confirm_password", {
                                    required: messages.req,
                                    validate: (val) => {
                                      if (watch('passwordRegister') !== val) {
                                        return "Tu contraseña no coincide"
                                      }
                                    },
                                   })} type="password" placeholder="Password" />
                                {errors.confirm_password && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.confirm_password.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='mb-4'>
                                <FormLabel style={white}>Correo Electrónico</FormLabel>
                                <Form.Control {...register("emailRegister", {
                                     required: messages.req,
                                     pattern: {
                                        value: patterns.mail,
                                        message: messages.mail
                                      }
                                     })} type="email" placeholder="Email" />
                                {errors.emailRegister && 
                                    <div style={{marginTop:"5px"}}>
                                        <label style={red}><FiAlertTriangle style={{marginBottom: "4px"}}/> {errors.emailRegister.message}</label>
                                    </div>
                                }
                            </div>
                            <div className='d-grid'>
                                <Button type='submit' variant="primary">Sign Up</Button>
                            </div>
                            <div className='my-3'>
                                <span style={white}>¿Ya tienes cuenta? <Link onClick={registrar} to="/" style={{ color: "#198754" }}>Login</Link></span>
                            </div>
                        </Form>
                    }
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