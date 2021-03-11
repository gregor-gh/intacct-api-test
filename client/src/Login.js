import React from 'react'
import Textbox from "carbon-react/lib/__experimental__/components/textbox";
import Button from "carbon-react/lib/components/button";
import Form from "carbon-react/lib/components/form";
import "./Login.css"
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("demouser");
  const [password, setPassword] = useState("demouser");
  const [message, setMessage] = useState("") // returns any error messages


  const submit = async e => {
    // send login request to the api
    e.preventDefault();
    console.log(e)
    let formData = new FormData()
    formData.append("username", username);
    formData.append("password", password);

    const body = new URLSearchParams(formData)
    const method = "PUT" // original used GET but this doesn't allow body, not worth rewriting

    try {
      const response = await fetch("/api/user", { method, body });
      const data = await response.json();
      console.log(data)
      if (!data["Error"]) {
        window.location.reload();
      } else {
        setMessage(data["Error"])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="login-screen">
      <img id="login-image" src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Sage_logo.png" />
  
      <Form id="login-form">
        <Textbox label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
        <Textbox type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Button buttonType="primary" type="submit" onClick={submit}>
          Sign In
        </Button>
        <br/>
        <span style={{ color: "red" }}>{message}</span>
        
      </Form>
    </div>
  )
}

export default Login
