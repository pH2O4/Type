import {React, useState} from "react";
import './login.css'
import {Form, Button} from 'react-bootstrap'
import Axios from 'axios'

const Login = () => {

  const [valuesL, setValuesL] = useState();
  const ChangingValueL = (valueL) => {
    setValuesL((prevValueL) => ({
      ...prevValueL,
      [valueL.target.name]: valueL.target.value,
    }));
  };

  const LLogin = () =>{
    Axios.post('http://localhost:3005/api/Login',{
       Email: valuesL.EmailL,
       Pass: valuesL.PassL,
    } ).then((response)=> {
      if(response.data.auth == true){
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('Email', response.data.Email)
        window.location.href = 'http://localhost:3000/Main'
    //    clearStore()
      }else{
        window.alert(`${response.data}`)
        console.log(response.data)

      }

    })

  }
  window.onload = () => {
if(!localStorage.token){
}else{

window.location.href = 'http://localhost:3000/Main'
}

  }
  return(
   <div className="Login d-flex justify-content-center ">
  <Form className="FORMX">
  <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange={ ChangingValueL} name="EmailL" type="email" placeholder="Enter email" />

  </Form.Group>

  <Form.Group className="mb-3 " controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control  onChange={ ChangingValueL} name="PassL" type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" onClick={() => LLogin()} >
    Login
  </Button> <br /> <br />
  <Button href="/Cadastro" variant="primary">
    Submit
  </Button>
</Form>

    </div>
  )
}

export default Login