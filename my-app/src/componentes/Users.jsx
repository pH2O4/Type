import React from "react";
import './Users.css'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

const Users = () => {

  window.onload = () => {
    Axios.post('http://localhost:3005/api/GetUserInformations', {
      EmailX: localStorage.Email,

    }).then((response) => {
      console.log(response.data)
const contato = response.data.Contato
const email = response.data.Email
const name = response.data.Name
    })
    }

  return(
    <div className="Users">
<div>
<div className="UserInformation">
<div className="UserInformationComponent">User Name:{contato}</div>
<div className="UserInformationComponent">Contato:{email} </div>
<div className="UserInformationComponent">Email: {name}</div>
<div> <Button variant="primary">Delete My Count</Button></div>
</div>
</div>
    </div>
  )
}

export default Users