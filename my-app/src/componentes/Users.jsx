import React from "react";
import './Users.css'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

const Users = () => {

  const hinddenConfirmation = () => {
    document.getElementById("DeletingHidden").style.display = 'none';
  }

 const DeltingAcount = () =>{
  document.getElementById("DeletingHidden").style.display = 'flex';
 }

 const DeltingAcoutConfirmted = () =>{
  Axios.delete('http://localhost:3005/api/DeletingUser',{
    EmailX: localStorage.Email

  } ).then((response) => {
    console.log(response.data)
    window.alert(`${response.data}`)
    localStorage.clear()
    window.location.href = 'http://localhost:3000/'
  })
}



  window.onload = () => {
    Axios.post('http://localhost:3005/api/GetUserInformations', {
      EmailX: localStorage.Email,

    }).then((response) => {
const contato = `<b> User Contact: </b>${response.data.Contato} `
const email =  ` <b> User Email: </b>${response.data.Email} `
const name = `<b> User Name: </b> ${response.data.Name} `
document.querySelector('#NAMEUSERPAG').innerHTML =  name
document.querySelector('#CONTATOUSERPAG').innerHTML =  contato
document.querySelector('#EMAILUSERPAG').innerHTML =  email
    })
    }

  return(
    <div className="Users">
<div className="ajustcenter">
<div className="UserInformation">
<div id="NAMEUSERPAG" className="UserInformationComponent"></div>
<div id="CONTATOUSERPAG" className="UserInformationComponent"> </div>
<div id="EMAILUSERPAG" className="UserInformationComponent"></div>
<div> <Button onClick={() => DeltingAcount()} variant="primary">Delete My Count</Button></div>
</div>
<div id="DeletingHidden" className="DeleteConfirmation">
Do you have  sure?
<div className="buttoncancel"> <Button onClick={() => DeltingAcoutConfirmted()} variant="primary">Delete Confirmation</Button></div>
<div className="buttoncancel"> <Button onClick={() => hinddenConfirmation()} variant="danger">Cancel</Button></div>
</div>
</div>
    </div>
  )
}

export default Users