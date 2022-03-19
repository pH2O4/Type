import {React, useState} from "react";
import './ProductsRegister.css'
import {Button, Form, Navbar, Nav, Container} from 'react-bootstrap'
import  Axios  from "axios";
import $ from 'jquery'
import {faUser, faArrowRightFromBracket, faScrewdriverWrench, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Register = () => {

  const [valuesP, setValuesP] = useState();
  const ChangingValueP = (valueP) => {
    setValuesP((prevValueP) => ({
      ...prevValueP,
      [valueP.target.name]: valueP.target.value,
    }));
  };

const Registring = () => {
  Axios.post( 'http://localhost:3005/api/ReciveProductsRoute',{
    ClassP: valuesP.ClassP,
    ProductN: valuesP.productname,
    AmountP: valuesP.AmountP

  } ).then((response) => {
    window.alert(`${response.data}`)
  })
}

  $(window).on("load", function(){

      Axios.post( 'http://localhost:3005/api/Auth',{
      TOKENX: localStorage.token

     } ).then((response)=> {
if(response.data.auth == false){
      window.alert(`${response.data.message}`)
    window.location.href = 'http://localhost:3000/'
}


     })

 })

  const Logoff = () =>{
    Axios.post('http://localhost:3005/api/lgoff',{

    } ).then((response)=> {
      console.log(response.data)
 if(response.data.auth == false){
   localStorage.clear()
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
    <Form.Control onChange={ ChangingValueP} name="productname" type="text" placeholder="Products Name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicClass">
  <select name="ClassP"  onChange={ ChangingValueP} className="form-select form-select-sm" aria-label=".form-select-sm example">
  <option value>Select Class</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Other</option>
</select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Control name="AmountP" onChange={ ChangingValueP} type="Number" placeholder="Amount" />
  </Form.Group>

  <Button onClick={() => Registring ()} variant="primary">
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

  </tbody>
</table>
</div>


    </div>
  )
}

export default Register