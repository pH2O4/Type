import {React, useState} from "react";
import './ProductsRegister.css'
import {Button, Form, Navbar, Nav, Container} from 'react-bootstrap'
import  Axios  from "axios";
import $ from "jquery"
import {faUser, faArrowRightFromBracket, faScrewdriverWrench, faPlusCircle, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
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
const localSTORAGE = localStorage.getItem('checkBeforeDoo')
const idC = response.data
if(localSTORAGE == 'false'){
  for (let i = 0; i < idC.length; i++) {
 const separandoC = idC[i]
 document.getElementById("inputOptions").insertAdjacentHTML('beforeend', `<option value="${separandoC.Name}">${separandoC.Name}</option>`)
}

}
localStorage.setItem('checkBeforeDoo', true)


})
}


const checkIfAllReadyHaveClass = () =>{
Axios.post('http://localhost:3005/api/CheckingTheCLass' , {
  Product: valuesP.productname,
}).then((response) => {
  if(response.data == "nothing founded"){
      let inputbyid = document.querySelector("#inputOptions");
  inputbyid.disabled = false
  } else {
    let inputbyid = document.querySelector("#inputOptions");
    inputbyid.disabled = true
    valuesP.ClassP = response.data
  }

})

}

const RegistringClass = () => {
  Axios.post( 'http://localhost:3005/api/RegisterClass',{
    ClassPCREATE: valuesP.NewCLassName,
  } ).then((response) => {
   window.alert(`${response.data}`)

   chargingItens('RestringOption')
  window.location.href = 'http://localhost:3000/Register'
  })
}



function Mudarestado() {
  const display = document.getElementById("CreatingNewCLasss").style.display;
  if(display == "none")
      document.getElementById("CreatingNewCLasss").style.display = 'block';
  else
      document.getElementById("CreatingNewCLasss").style.display = 'none';
}


const Registring = () => {
  Axios.post( 'http://localhost:3005/api/ReciveProductsRoute',{
    ClassP: valuesP.ClassP,
    ProductN: valuesP.productname,
    AmountP: valuesP.AmountP

  } ).then((response) => {
    window.alert(`${response.data}`)

   chargingItens('RestringOption')
  window.location.href = 'http://localhost:3000/Register'
  })
}

const chargingItens = (LOADOPTION) => {
if(LOADOPTION == 'windowOPTION') {
 Axios.get('http://localhost:3005/api/GettingAllProducts', {
  }).then((response) => {

const idP = response.data
if(idP){
for (let i = 0; i < idP.length; i++) {
const separandoP = idP[i]
document.getElementById("Tableboddyy").insertAdjacentHTML('beforeend',
`    <tr>
<td>${separandoP.Id}</td>
<td>${separandoP.NameProduct}</td>
<td>${separandoP.Amount}</td>
<td>${separandoP.className}</td>
<td>${separandoP.createdAt}</td>
</tr>`)
}

}

  })
}else {
  Axios.get('http://localhost:3005/api/GettingAllProducts', {
  }).then((response) => {

const idP = response.data
if(idP){

const separandoP = idP.pop()
document.getElementById("Tableboddyy").insertAdjacentHTML('beforeend',
`    <tr>
<td>${separandoP.Id}</td>
<td>${separandoP.NameProduct}</td>
<td>${separandoP.Amount}</td>
<td>${separandoP.className}</td>
<td>${separandoP.createdAt}</td>
</tr>`)

}

  })
}

}

window.onload = () => {

 localStorage.setItem('checkBeforeDoo', false)

 chargingItens('windowOPTION')

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

const HiddenContentCR = () => {
  document.getElementById("CreatingNewCLasss").style.display = 'none';
}
  return(
    <div className="PR d-flex p-5">
      <div className="NavBarx">
      <nav className="nav flex-column ">
  <a className="KK nav-link active" href="/Users"><FontAwesomeIcon icon={faUser}/></a>
  <a className="KK nav-link"><FontAwesomeIcon icon={faScrewdriverWrench}/></a>
  <a className="KK nav-link active" href="/searchingProducts " ><FontAwesomeIcon icon={faMagnifyingGlass}/></a>
  <a className="KK nav-link active" onClick={() => Logoff()}><FontAwesomeIcon icon={faArrowRightFromBracket}/></a>
</nav>
      </div>
      <div >
      <Form className= " FORRM  m-5">
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Sent The Produtcs Informations</Form.Label>
    <Form.Control onBlur={() => checkIfAllReadyHaveClass()} onChange={ ChangingValueP} name="productname"  type="text" placeholder="Products Name" />
  </Form.Group>

  <Form.Group id="OPTIONCLASSFORM" className="mb-1" controlId="formBasicClass">
  <select id="inputOptions" onClick={() => getingClassCretead()} name="ClassP"  onChange={ ChangingValueP} className="form-select form-select-sm" aria-label=".form-select-sm example">
  <option value>Select Class</option>
</select>
  </Form.Group>
  <a  onClick={() => Mudarestado()} id="ADDNEWCLASXY"className="nav-link"><FontAwesomeIcon icon={faPlusCircle}/><b> Clik For New Class</b> </a>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Control name="AmountP" onChange={ ChangingValueP} type="Number" placeholder="Amount" />
  </Form.Group>

  <Button onClick={() => Registring ()} variant="primary">
    Register
  </Button>
</Form >
<Form id="CreatingNewCLasss" className= " FORRM m-5">
  <Form.Group  className="mb-3" controlId="formBasiC">
    <Form.Label>Sent A New Class</Form.Label>
    <Form.Control onChange={ChangingValueP} name="NewCLassName" type="text" placeholder="Class Name" />
  </Form.Group>


  <Button onClick={() => RegistringClass () } variant="primary">
    Register
  </Button>
  <Button onClick={() => HiddenContentCR () } variant="danger">
    Cancel
  </Button>
</Form>
      </div>
<div className="TABLE m-5">
<table className="table">
  <thead className="TopTable">
    <tr>
      <th scope="col">Código do Produto</th>
      <th scope="col">Products Name</th>
      <th scope="col">Amount</th>
      <th scope="col">Class</th>
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