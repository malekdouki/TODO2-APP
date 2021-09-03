return (
    <>
      <div className='ca container '>
        <div className='login-content' >
          <div>
          <h2 className=" mb-4 titre">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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