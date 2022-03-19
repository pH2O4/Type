import {React, useState} from "react";
import './Cadastro.css'
import {Form, Button} from 'react-bootstrap'
import Axios from 'axios'

const Cadastro = () => {

  const [values, setValues] = useState();
  const ChangingValue = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const Registerx = () =>{
    Axios.post('http://localhost:3005/api/Criarusuario',{
       Email: values.Email,
       Name: values.FullName,
       Number: values.Number,
       Pass: values.Pass,
       PassR:  values.PassR,
    } ).then((response)=> {
window.alert(`${response.data}`)
if(response.data == "Parabéns sua conta foi criada! estamos te encaminhando para area de login"){
  window.location.href = 'http://localhost:3000/'
}
    })
  }

  return(
<div className="Cadastro d-flex justify-content-center ">
<Form className="FORMC">
  <Form.Group className="mb-2  " controlId="formBasicEmailC">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="Email" onChange={ChangingValue}  type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group className="mb-2 w-100" controlId="formBasicName">
    <Form.Label>Full Name</Form.Label>
    <Form.Control name="FullName" onChange={ChangingValue}  type="text" placeholder="Enter name" />
  </Form.Group>
  <Form.Group className="mb-2 w-100" controlId="formBasicNumber">
    <Form.Label>Number Contact</Form.Label>
    <Form.Control name="Number" onChange={ChangingValue}  type="number" placeholder="Enter Number" />
  </Form.Group>
  <Form.Group className="mb-2 " controlId="formBasicPasswordC">
    <Form.Label>Password</Form.Label>
    <Form.Control name="Pass" onChange={ChangingValue}  type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-2 " controlId="formBasicPasswordR">
    <Form.Label>Repeat</Form.Label>
    <Form.Control name="PassR" onChange={ChangingValue}  type="password" placeholder="Repeat Password" />
  </Form.Group>

  <Button onClick={() => Registerx()} variant="primary">
    Submit
  </Button>
</Form>
</div>
  )
}

export default Cadastro