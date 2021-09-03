import React, { useRef, useState } from "react"
import { Form, Button,  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../App.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <div className='ca container   '>
        <div className='login-content' >
          <div>
          <h2 className=" mb-4 titre">Log In</h2>
          {error && <Alert variant="danger" className="alert">{error}</Alert>}
          <Form onSubmit={handleSubmit} className='form'>
            <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} id="btn" type="submit">
              Log In
            </Button>
          </Form>
         
          <div className=" text-center mt-3 ">
            <Link to="/forgot-password" >Forgot Password?</Link>
          </div>
          <div  className="mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          </div>
          
        </div>
      </div>
      
    </>
  )
}