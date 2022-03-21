import {React, useState} from "react";
import './ProductsRegister.css'
import {Button, Form, Navbar, Nav, Container} from 'react-bootstrap'
import  Axios  from "axios";
import $ from "jquery"
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


const getingClassCretead = () => {
Axios.get('http://localhost:3005/api/GetAllCalass',{

}).then((response) => {
console.log(response.data)
const localSTORAGE = localStorage.getItem('checkBeforeDoo')
const idC = response.data
if(localSTORAGE == 'false'){
  for (let i = 0; i < idC.length; i++) {
 const separandoC = idC[i]
 document.getElementById("inputOptions").insertAdjacentHTML('beforeend', `<option value="${separandoC.id}">${separandoC.Name}</option>`)
}

}
localStorage.setItem('checkBeforeDoo', true)
})
}

const Registring = () => {
  Axios.post( 'http://localhost:3005/api/ReciveProductsRoute',{
    ClassP: valuesP.ClassP,
    ProductN: valuesP.productname,
    AmountP: valuesP.AmountP

  } ).then((response) => {
    window.alert(`${response.data}`)

  })
}

window.onload = () => {
  localStorage.setItem('checkBeforeDoo', false)
    Axios.get('http://localhost:3005/api/GettingAllProducts', {
    }).then((response) => {

  const idP = response.data
  console.log(idP)
if(idP){
  for (let i = 0; i < idP.length; i++) {
 const separandoP = idP[i]
 document.getElementById("Tableboddyy").insertAdjacentHTML('beforeend',
 `    <tr>
 <td>${separandoP.Id}</td>
 <td>${separandoP.NameProduct}</td>
 <td>${separandoP.Amount}</td>
 <td>${separandoP.createdAt}</td>
</tr>`)
}

}

    })

      Axios.post( 'http://localhost:3005/api/Auth',{
      TOKENX: localStorage.token

     } ).then((response)=> {

if(response.data.auth == false){
      window.alert(`${response.data.message}`)
    window.location.href = 'http://localhost:3000/'
}


     })

 }

  const Logoff = () =>{
    Axios.post('http://localhost:3005/api/lgoff',{

    } ).then((response)=> {
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
  <select id="inputOptions" onClick={() => getingClassCretead()} name="ClassP"  onChange={ ChangingValueP} className="form-select form-select-sm" aria-label=".form-select-sm example">
  <option value>Select Class</option>
  <option value>Create a New CLass</option>
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
      <th scope="col">iD</th>
      <th scope="col">Products Name</th>
      <th scope="col">Amount</th>
      <th scope="col">Date Creation</th>
    </tr>
  </thead>
  <tbody id="Tableboddyy">


  </tbody>
</table>
</div>


    </div>
  )
}

export default Register