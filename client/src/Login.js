import React from 'react'
import Textbox from "carbon-react/lib/__experimental__/components/textbox";
import Button from "carbon-react/lib/components/button";
import Form from "carbon-react/lib/components/form";
import "./Login.css"

const Login = () => {
  return (
    <div id="login-screen">
      <img id="login-image" src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Sage_logo.png"/>
      <Form id="login-form">
        <Textbox label="Username" />
        <Textbox label="Password" />
        <Button buttonType="primary" type="submit">Sign In</Button>
        Register
      </Form>
    </div>
  )
}

export default Login
