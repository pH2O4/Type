import {React, useState} from "react";
import './ProductsRegister.css'
import {Button, Form, Navbar, Nav, Container} from 'react-bootstrap'
import  Axios  from "axios";
import $ from 'jquery'
import {faUser, faArrowRightFromBracket, faScrewdriverWrench, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Register = () => {

  $(window).on("load", function(){

      Axios.post( 'http://localhost:3002/api/Auth',{
        headers: {
          token: ['x-access-token']
        },
     } ).then((response)=> {

    window.alert(`${response.data.message}`)

     })

 });

  const Logoff = () =>{
    Axios.get('http://localhost:3002/api/lgoff',{

    } ).then((response)=> {
      console.log(response.data)
 if(response.data == "tokenInvd"){
  window.location.href = 'http://localhost:3000/'
 }

    })
  }

  return(
    <div className="PR d-flex p-5">
      <div className="NavBarx">
      <nav className="nav flex-column ">
  <a className="nav-link active" href="#"><FontAwesomeIcon icon={faUser}/></a>
  <a className="nav-link" href="#"><FontAwesomeIcon icon={faScrewdriverWrench}/></a>
  <a className="nav-link" href="#"><FontAwesomeIcon icon={faPlusCircle}/></a>
  <a className="nav-link active" onClick={() => Logoff()}><FontAwesomeIcon icon={faArrowRightFromBracket}/></a>
</nav>
      </div>
      <div >
      <Form className= " FORRM  m-5">
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Sent The Produtcs Informations</Form.Label>
    <Form.Control type="text" placeholder="Products Name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicClass">
  <select className="form-select form-select-sm" aria-label=".form-select-sm example">
  <option value>Select Class</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Other</option>
</select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Control type="Number" placeholder="Amount" />
  </Form.Group>

  <Button variant="primary">
    Register
  </Button>
</Form>
      </div>
<div className="TABLE m-5">
<table className="table">
  <thead className="TopTable">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Products Names</th>
      <th scope="col">Class</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>


    </div>
  )
}

export default Register